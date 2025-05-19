import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Avatar,
  Link,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { LuUpload } from "react-icons/lu";

export const AVATAR_ARRAY = [
  "curly-hair-man.png",
  "curly-hair-man-1.png",
  "curly-hair-man-2.png",
  "curly-hair-man-3.png",
  "curly-hair-man-4.png",
  "curly-hair-man-5.png",
  "curly-hair-man-6.png",
  "curly-hair-man-7.png",
  "curly-hair-man-8.png",
  "curly-hair-man-9.png",
  "curly-hair-man-10.png",
  "curly-hair-man-11.png",
  "curly-hair-man-12.png",
  "curly-hair-man-13.png",
  "curly-hair-man-14.png",
  "curly-hair-man-15.png",
  "curly-hair-man-16.png",
  "curly-hair-man-17.png",
  "curly-hair-man-18.png",
  "curly-hair-man-19.png",
  "curly-hair-man-20.png",
  "curly-hair-man-21.png",
  "curly-hair-man-22.png",
  "curly-hair-man-23.png",
  "curly-hair-man-24.png",
  "curly-hair-man-25.png",
  "curly-hair-man-26.png",
  "curly-hair-man-27.png",
  "curly-hair-man-28.png",
  "curly-hair-man-29.png",
  "curly-hair-man-30.png",
  "curly-hair-man-31.png",
  "curly-hair-man-32.png",
  "curly-hair-man-33.png",
  "curly-hair-man-34.png",
  "curly-hair-man-35.png",
  "curly-hair-man-36.png",
  "curly-hair-man-37.png",
  "curly-hair-man-38.png",
  "curly-hair-man-39.png",
  "curly-hair-man-40.png",
  "curly-hair-man-41.png",
  "curly-hair-man-42.png",
  "curly-hair-man-43.png",
  "curly-hair-man-44.png",
  "curly-hair-man-45.png",
];

interface IProps {
  onSave: React.Dispatch<React.SetStateAction<string | null>>;
  avatar?: string | null;
}

const Avatars = ({ onSave, avatar }: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<string | null | undefined>(
    avatar?.split("/")[3]
  );

  useEffect(() => {
    if (selected) onSave(`/img/avatars/${selected}`);
  }, [selected]);

  useEffect(() => {
    if (avatar) {
      setSelected(avatar?.split("/")[3]);
    }
  }, [avatar]);

  return (
    <>
      <div className="flex flex-col items-center justify-center relative">
        <Avatar
          src={`${selected ? `/img/avatars/${selected}` : ""}`}
          size="lg"
          showFallback={false}
        />
        <div
          onClick={onOpen}
          className="absolute -bottom-1 -right-2 z-50 w-6 h-6 rounded-full bg-white dark:bg-default dark:border-2 dark:border-background flex items-center justify-center cursor-pointer hover:text-primary"
        >
          <LuUpload className="text-base" />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        className="z-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-md font-bold">
                Avatars
              </ModalHeader>

              <ModalBody>
                <div className="grid grid-cols-4 gap-6 h-[360px] overflow-y-scroll p-2">
                  {AVATAR_ARRAY.map((avatar, index) => {
                    const src = `/img/avatars/${avatar}`;
                    return (
                      <Avatar
                        key={index}
                        isBordered
                        src={src}
                        onClick={() => setSelected(avatar)}
                        color={`${selected === avatar ? "success" : "default"}`}
                        className=" cursor-pointer w-20 h-20"
                      />
                    );
                  })}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  isDisabled={selected === null}
                  onPress={onClose}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Avatars;
