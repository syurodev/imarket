import React from "react";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  children: React.ReactNode,
  height?: "!h-[98%]" | "!h-[95%]"
  title?: string;
}

const BigModal: React.FC<IProps> = ({ isOpen, onClose, onOpenChange, height, title, children }) => {

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        size="5xl"
        placement="bottom"
        backdrop="opaque"
        isKeyboardDismissDisabled
        classNames={{
          base: `!max-w-[98%] ${height ? height : "!h-[98%]"} mx-2 !mb-0 !absolute !bottom-0 !rounded-b-none !overflow-auto`
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title || "Modal Title"}
              </ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BigModal