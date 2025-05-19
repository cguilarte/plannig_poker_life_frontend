import {
  selectInfoPlanning,
  selectProfile,
} from "@/app/planning/core/infrastructure/redux";
import { useAppSelector } from "@/infrastructure/hooks/store";
import {
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/legacy/image";
import React, { useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiShieldUserFill } from "react-icons/ri";
import Form from "./components/Form";

const emojis = ["❤️", "🪨​", "😂", "​🤌🏼", "😢", "😡", "🎉", "🔥", "​📍", "👏"];

interface IProps {
  id: string;
  padding?: string;
  active: boolean;
  image?: string;
  name: string;
  email: string;
  showCard: boolean;
  isVoto: boolean;
  value: string;
  modeObserver: boolean;
  handleEmojiClick: (emoji: string, toUserId: string) => void;
}

const User = ({
  id,
  modeObserver,
  padding,
  active,
  image = "",
  name,
  showCard = false,
  isVoto = false,
  value = "",
  email,
  handleEmojiClick,
}: IProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { user }: any = useAppSelector(selectInfoPlanning);
  const profile: any = useAppSelector(selectProfile);
  const username =
    name.split(" ").length >= 2
      ? `${name.split(" ")[0]} ${name.split(" ")[1].substring(0, 1)}.`
      : name;

  return (
    <>
      <Tooltip
        content={
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji, emojiIndex) => (
              <button
                key={emojiIndex}
                onClick={() => handleEmojiClick(emoji, id)}
                className="text-xl p-1 rounded-full hover:bg-yellow-100 transition-all duration-200 hover:scale-125 active:scale-95"
                title={`Lanzar ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        }
      >
        <div className={`${padding} ${!active ? "opacity-90" : ""}`}>
          <div className="flex flex-col justify-center items-center relative">
            <div
              className={`w-6 h-8 rounded-md z-10 border-[2px] border-solid border-white dark:border-background ${
                isVoto
                  ? "bg-primary"
                  : "bg-secondary-100 dark:bg-default  dark:border-background"
              } absolute -right-3.5 top-2 text-center flex items-center justify-center`}
            >
              {showCard && !modeObserver && (
                <span className="font-bold text-xs text-white">{value}</span>
              )}
              {modeObserver && <AiOutlineEye />}
            </div>

            <div
              data-user-id={id}
              className={`rounded-full ${
                email === user.email ? "ring-2 ring-primary p-1" : ""
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full overflow-hidden ${
                  active
                    ? "shadow-avatar-active"
                    : "shadow-avatar-inactive dark:shadow-none"
                } relative bg-white dark:bg-default`}
              >
                {image?.length > 0 && (
                  <Image
                    src={`${window.location.origin}${image}`}
                    objectFit="cover"
                    layout="fill"
                    alt="curly-hair-man"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <strong className="text-[11px] pt-1 font-bold flex items-center space-x-2 truncate">
                {username}
              </strong>
              <Tooltip content="Editar perfil" placement="bottom">
                <span>
                  {email === profile.email && (
                    <CiEdit
                      onClick={onOpen}
                      className="font-bold text-lg cursor-pointer hover:text-primary"
                    />
                  )}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </Tooltip>

      <Form isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </>
  );
};

export default User;
