"use client";

import React, { useEffect, useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./MainPrompt.module.css";
import Auth from "../Auth/Auth";
import SpinnerWhite from "../SpinnerWhite/SpinnerWhite";
import toast from "react-hot-toast";
import Sheet from "react-modal-sheet";
import { cutString } from "../../utils/utils";
import { focusOptions } from "../../utils/data";
import { Mode, Chat } from "@/utils/types";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { createChatThread } from "../../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetailsState, selectAuthState } from "@/store/authSlice";
import { selectModel } from "@/store/aiSlice";
import { db } from "../../../firebaseConfig";
import AnimatedBackgroundUmi from '../Animate/AnimatedBackgroundUmi';
import AnimatedBackground from '../Animate/AnimatedBackground';
import AnimatedBackgroundWorm from '../Animate/AnimatedBackgroundWorm';
import Arrow from "../../../public/svgs/Arrow.svg";
import Filter from "../../../public/svgs/Filter.svg";
import Check from "../../../public/svgs/Check.svg";
import Logo from "../../../public/Logo.svg";
import DuinoUMILogo1 from "../../../public/svgs/duino-umi/EST.svg";
import DuinoUMILogo2 from "../../../public/svgs/duino-umi/UMI.svg";
import UploadIcon from "../../../public/svgs/upload.svg"; // Import the upload icon

const MainPrompt = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const authState = useSelector(selectAuthState);
  const userDetails = useSelector(selectUserDetailsState);
  const userId = userDetails.uid;
  const aiModel = useSelector(selectModel);

  const [text, setText] = useState("");
  const [width, setWidth] = useState(0);
  const [modal, setModal] = useState("");
  const [mode, setMode] = useState<Mode>("");
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState({
    website: "Focus",
    icon: Filter,
    query: "",
  });
  const [background, setBackground] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [sloganIndex, setSloganIndex] = useState(0);
  const [sloganText, setSloganText] = useState("");
  const [cursor, setCursor] = useState(true);
  const slogans = ["Where Exploration Begins", "Your AI Companion", "Unlock Knowledge"];
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
useEffect(() => {
    const textArea = textAreaRef.current;

    const resizeTextArea = () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    if (textArea) {
      resizeTextArea(); // Initial resize
      textArea.addEventListener("input", resizeTextArea);
    }

    
  }, [text]); 
  useEffect(() => {
    const interval = setInterval(() => {
      if (sloganText === slogans[sloganIndex]) {
        setCursor(!cursor);
      } else {
        setSloganText(slogans[sloganIndex].substring(0, sloganText.length + 1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [sloganText, sloganIndex]);

  useEffect(() => {
    let backgroundStyle, logoSVGs;

    switch (aiModel) {
      case "Duino-Prime":
        backgroundStyle = <AnimatedBackground type="duino-prime" />;
        break;

      case "UMI-Duino":
        backgroundStyle = <AnimatedBackgroundUmi type="umi-duino" />;
        break;

      case "Worm-Duino":
        backgroundStyle = <AnimatedBackgroundWorm type="worm-duino" />;
        break;

      default:
        backgroundStyle = <AnimatedBackground type="default" />;
        logoSVGs = [];
    }

    setBackground(backgroundStyle);

    const backgroundImagesContainer = document.querySelector(`.${styles.backgroundImagesContainer}`);
    if (backgroundImagesContainer) {
      backgroundImagesContainer.innerHTML = "";
      logoSVGs.forEach((SVGComponent, index) => {
        const backgroundImage = document.createElement("div");
        backgroundImage.classList.add(styles.backgroundImage);
        backgroundImage.style.animationDelay = `${index * 0.5}s`;
        backgroundImage.style.filter = "drop-shadow(0 0 5px #00ffff)";
        backgroundImage.appendChild(SVGComponent);
        backgroundImagesContainer.appendChild(backgroundImage);
      });
    }
  }, [aiModel]);

  const handleFocusChange = (
    website: string,
    query: string,
    icon: StaticImageData
  ) => {
    if (website === "Focus") {
      setMode("");
    } else if (website === "Writing") {
      setMode("chat");
    } else {
      setMode("search");
    }
    setFocus({ website, icon, query });
    setOpen(false);
  };

  const handleSend = async () => {
    if (text.trim() !== "" || selectedFile) {
      const id = nanoid(10);
      const chatObject: Chat = {
        mode: mode, 
        question: text.trim(),
        answer: "",
        query: focus.query,
        file: selectedFile, // Add the file to the chat object
      };

      if (userId) {
        try {
          console.log("Adding document...", userId);
          const batch = writeBatch(db);
          const historyRef = doc(db, "users", userId, "history", id);
          const indexRef = doc(db, "index", id);
          batch.set(historyRef, {
            chats: [chatObject],
            messages: [],
            createdAt: new Date(),
          });
          batch.set(indexRef, { userId });
          await batch.commit();
          console.log("Documents added successfully.");
        } catch (error) {
          console.error("Error adding document: ", error);
          toast.error("Something went wrong", {
            position: "top-center",
            style: {
              padding: "6px 18px",
              color: "#fff",
              background: "#FF4B4B",
            },
          });
        }
      }

      dispatch(createChatThread({ id, chat: chatObject }));
      router.push(`/chat/${id}`);
    } else return;
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && (text.trim() !== "" || selectedFile)) {
      event.preventDefault();
      handleSend();
    } else if (event.key === "Enter" && event.shiftKey) {
      // Allow shift+enter for new line
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setThumbnailURL(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        const extension = file.name.split(".").pop()?.toLowerCase() || "";
        setThumbnailURL(getFileTypeIcon(extension));
      }
    } else {
      setThumbnailURL("");
    }
  };

 const getFileTypeIcon = (extension: string) => {
const icons = {
'txt': 'https://img.icons8.com/?size=100&id=48585&format=png&color=000000',
'rtf': 'https://img.icons8.com/?size=100&id=alrozKWyr88D&format=png&color=000000',
'doc': 'https://img.icons8.com/?size=100&id=30464&format=png&color=000000',
'docx': 'https://img.icons8.com/?size=100&id=117563&format=png&color=000000',
'pdf': 'https://cdn-icons-png.flaticon.com/512/136/136522.png',
'odt': 'https://img.icons8.com/?size=100&id=sAolEVcdHUOQ&format=png&color=000000',
'md': 'https://img.icons8.com/?size=100&id=n86bfH5a2pwD&format=png&color=000000',
'html': 'https://cdn-icons-png.flaticon.com/512/136/136528.png',
'htm': 'https://cdn-icons-png.flaticon.com/512/136/136528.png',
'xml': 'https://img.icons8.com/?size=100&id=hldPIHbULUz9&format=png&color=000000',
'csv': 'https://img.icons8.com/?size=100&id=107445&format=png&color=000000',
'tsv': 'https://cdn-icons-png.flaticon.com/512/136/136524.png',
'json': 'https://img.icons8.com/?size=100&id=DuPGo_P_q_-x&format=png&color=000000',
'yaml': 'https://cdn-icons-png.flaticon.com/512/136/136539.png',
'ini': 'https://img.icons8.com/?size=100&id=vLZoUhTegOUx&format=png&color=000000',
'cfg': 'https://cdn-icons-png.flaticon.com/512/136/136534.png',
'xls': 'https://img.icons8.com/?size=100&id=13425&format=png&color=000000',
'xlsx': 'https://img.icons8.com/?size=100&id=144I2HGbcQGj&format=png&color=000000',
'ods': 'https://cdn-icons-png.flaticon.com/512/136/136534.png',
'ppt': 'https://img.icons8.com/?size=100&id=19670&format=png&color=000000',
'pptx': 'https://img.icons8.com/?size=100&id=117557&format=png&color=000000',
'odp': 'https://cdn-icons-png.flaticon.com/512/136/136533.png',
'py': 'https://img.icons8.com/?size=100&id=13441&format=png&color=000000',
'java': 'https://img.icons8.com/?size=100&id=uKNojs9CytOJ&format=png&color=000000',
'js': 'https://img.icons8.com/?size=100&id=XEpjPzC3Okps&format=png&color=000000',
'cpp': 'https://img.icons8.com/?size=100&id=O9DJ5HgMzcFJ&format=png&color=000000',
'hpp': 'https://cdn-icons-png.flaticon.com/512/136/136541.png',
'c': 'https://img.icons8.com/?size=100&id=XEpjPzC3Okps&format=png&color=000000',
'php': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'go': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'swift': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'rb': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'cs': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ts': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'sql': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'css': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jpg': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jpeg': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'png': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'gif': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'bmp': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'tiff': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'webp': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'svg': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'eps': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ai': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ico': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'psd': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'raw': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'cr2': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'nef': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'orf': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'arw': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'dng': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'heic': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ind': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jxr': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jp2': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jpm': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'jpf': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'pbm': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'pgm': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ppm': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'yuv': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'mp4': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'avi': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'mov': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'wmv': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'flv': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'mkv': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'webm': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'h264': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'h265': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'gifv': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'wav': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'mp3': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'ogg': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'flac': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'aac': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'm4a': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'aiff': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000',
'wma': 'https://img.icons8.com/?size=100&id=Fbfs8yWDXv3K&format=png&color=000000'
};
return icons[extension] || 'https://img.icons8.com/?size=100&id=48690&format=png&color=000000'; // Default icon for unknown file types
};

  const handleClick = () => {
    setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    setSloganText("");
  };

  // ... (rest of your component code)

  return (
    <div className={styles.container}>
      {background}
      <div className={styles.backgroundImagesContainer}></div>

      <Image src={Logo} alt="Logo.svg" width={150} height={150} />
      <div className={styles.title} onClick={handleClick}>
        <span ref={textRef}>DuinoBot:</span>
        <span> </span>
        <span className={styles.slogan}>
          {sloganText}
          {cursor && <span className={styles.cursor}>|</span>}
        </span>
      </div>

      {/* Focus Button */}
      <div className={styles.focusButtonContainer}>
        {width <= 512 && (
          <div className={styles.button} onClick={() => setOpen(true)}>
            <Image src={focus.icon} alt="Filter" width={24} height={24} />
            <p className={styles.buttonText}>{focus.website}</p>
          </div>
        )}
        {width > 512 ? (
          <Popover
            placement={"bottom-start"}
            radius="lg"
            offset={4}
            containerPadding={0}
            isOpen={open}
            onOpenChange={(open) => setOpen(open)}
          >
            <PopoverTrigger>
              <div className={styles.button}>
                <Image src={focus.icon} alt="Filter" width={18} height={18} />
                <p className={styles.buttonText}>{focus.website}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContainer}>
              <div className={styles.popover}>
                {focusOptions.map((option, index) => (
                  <div
                    key={index}
                    className={styles.popoverBlock}
                    onClick={() =>
                      option.website === "All"
                        ? handleFocusChange("Focus", "", Filter)
                        : handleFocusChange(
                            option.website,
                            option.query,
                            option.icon
                          )
                    }
                  >
                    <div className={styles.popoverTitleContainer}>
                      <Image
                        src={option.icon}
                        alt={option.website}
                        width={24}
                        height={24}
                      />
                      <p className={styles.popoverText}>{option.website}</p>
                    </div>
                    <p className={styles.popoverSmallText}>
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Sheet
            isOpen={open}
            onClose={() => setOpen(false)}
            detent="content-height"
          >
            <Sheet.Container style={{ background: "#232323" }}>
              <Sheet.Header />
              <Sheet.Content>
                <div className={styles.modal}>
                  {focusOptions.map((option, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={styles.modalBlock}
                        onClick={() =>
                          option.website === "All"
                            ? handleFocusChange("Focus", "", Filter)
                            : handleFocusChange(
                                option.website,
                                option.query,
                                option.icon
                              )
                        }
                      >
                        <div className={styles.modalRow}>
                          <div className={styles.modalTitleContainer}>
                            <Image
                              src={option.icon}
                              alt={option.website}
                              width={24}
                              height={24}
                            />
                            <p className={styles.modalText}>
                              {option.website}
                            </p>
                          </div>
                          {focus.website === option.website && (
                            <Image
                              src={Check}
                              alt="Check"
                              width={30}
                              height={30}
                            />
                          )}
                        </div>
                        <p className={styles.modalSmallText}>
                          {option.description}
                        </p>
                      </div>
                      {index !== 5 && <div className={styles.divider} />}
                    </React.Fragment>
                  ))}
                </div>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={() => setOpen(false)} />
          </Sheet>
        )}
      </div>

      {/* Text Area  */}
      <div className={styles.textAreaContainer}>
        <textarea
          ref={textAreaRef}
          placeholder="Ask Duino Anything..."
          className={styles.textArea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnter}
        />

        {/* Attach Button */}
        <label htmlFor="fileInput" className={styles.attachButton} style={{ fill: 'white' }}>
        <Image src={UploadIcon} alt="Upload" width={30} height={30} />
          <input 
            type="file" 
            id="fileInput" 
            className={styles.fileInput} 
            onChange={handleFileChange} 
          />
        </label>

        {/* Send Button */}
        <div className={styles.sendButton} onClick={handleSend}>
          <Image src={Arrow} alt="Arrow" width={30} height={30} />
        </div>

        {/* Thumbnail Preview */}
        {thumbnailURL && (
          <div className={styles.thumbnailPreview}>
            {selectedFile?.type.startsWith("image/") ? (
              <img 
                src={thumbnailURL} 
                alt={selectedFile?.name} 
                className={styles.thumbnailImage} 
              />
            ) : (
              <Image 
                src={thumbnailURL} 
                alt={selectedFile?.name || "File Icon"} 
                width={48} 
                height={48} 
                className={styles.thumbnailIcon} 
              />
            )}
          </div>
        )}
      </div>

      {modal === "auth" && <Auth isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default MainPrompt;