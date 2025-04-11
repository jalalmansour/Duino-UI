import React, { useState, useRef, useEffect } from "react";
import styles from "./Prompt.module.css";
import Image from "next/image";

import Arrow from "../../../public/svgs/Arrow.svg";
import Retry from "../../../public/svgs/Retry.svg";
import Fork from "../../../public/svgs/Fork.svg";
import Stop from "../../../public/svgs/Stop.svg";

type Props = {
  fork?: boolean;
  error: string;
  block: boolean;
  streaming: boolean;
  handleSend: (text: string) => void;
  handleCancel: () => void;
  handleRetry: () => void;
  handleFork: () => void;
};

const Prompt = (props: Props) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize the textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [text]);

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && text.trim() !== "") {
      event.preventDefault();
      props.handleSend(text);
      setText("");
    }
  };

  return (
    <>
      {props.fork ? (
        <div className={styles.forkContainer} onClick={props.handleFork}>
          <div className={styles.promptContainer}>
            <div className={styles.promptText}>Fork Thread</div>
            <div className={styles.retryButton}>
              <Image src={Fork} alt="Fork" width={24} height={24} />
            </div>
          </div>
        </div>
      ) : props.error.length > 0 ? (
        <div className={styles.retryContainer} onClick={props.handleRetry}>
          <div className={styles.promptContainer}>
            <div className={styles.promptText}>Try Again</div>
            <div className={styles.retryButton}>
              <Image src={Retry} alt="Return" width={24} height={24} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.promptContainer}>
            <textarea
              ref={textareaRef}
              disabled={props.streaming || props.block}
              placeholder="Ask Duino anything... (Press Enter to send, Shift+Enter for new line)"
              className={styles.promptText}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleEnter}
              rows={1}
            />
            {props.streaming ? (
              <div className={styles.stopButton} onClick={props.handleCancel}>
                <Image src={Stop} alt="Stop" width={24} height={24} />
              </div>
            ) : (
              <div
                className={styles.sendButton}
                style={{
                  opacity: text.length > 0 ? 1 : 0.5,
                }}
                onClick={() => {
                  if (text.trim() !== "") {
                    props.handleSend(text);
                    setText("");
                  }
                }}
              >
                <Image
                  src={Arrow}
                  alt="Arrow"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Prompt;
