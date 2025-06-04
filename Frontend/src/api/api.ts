import axios from "axios";
import { BACKEND_URL, ContentType, type BrainContent } from "../config";

export async function signin(username: string, password: string) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
    username,
    password,
  });
  const token = response.data.token;
  //  JSON.stringify(response.data.token, null, 2)
  localStorage.setItem("token", token);
}

export async function signup(username: string, password: string) {
  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
    username,
    password,
  });
}

export async function authUser({
  username, password,isSignup}: {username: string; password: string;isSignup: boolean;}) {
    console.log("from auth fn: "+isSignup)
  if (isSignup) {
    return await signup(username, password);
  } else {
    return await signin(username, password);
  }
}

export async function addContent(
  title: string,
  link: string,
  type: ContentType
) {
  await axios.post(
    `${BACKEND_URL}/api/v1/content`,
    {
      link,
      title,
      type,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
}

export async function getShareLink() {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/brain/share`,
    {
      share: "true",
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
  return shareUrl;
}

export async function sharedBrain(shareLink: string): Promise<BrainContent[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
  const brainContent = response.data.content;
  return brainContent;
}

export async function getBrainContent(): Promise<BrainContent[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  const brainContent = response.data.content;
  return brainContent;
}

export const deleteContent = async (contentId: string) => {
  return await axios.delete(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    data: {
      contentId,
    },
  });
};
