import Chat from "@/components/Chat/Chat";
import AuthWrapper from "../../AuthWrapper";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const ogImageUrl = `https://DuinoBot.ai/api/og?id=${params.id}`;

  return {
    title: "DuinoBot",
    description: "Search online with the power of AI. Try now!",
    openGraph: {
      title: "DuinoBot - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "DuinoBot - Web Search AI",
        },
      ],
      url: `https://DuinoBot.ai/chat/${params.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "DuinoBot - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "DuinoBot - Web Search AI",
        },
      ],
    },
  };
}

const ChatPage = ({ params }: Props) => {
  return (
    <AuthWrapper>
      <Chat id={params.id} />
    </AuthWrapper>
  );
};

export default ChatPage;
