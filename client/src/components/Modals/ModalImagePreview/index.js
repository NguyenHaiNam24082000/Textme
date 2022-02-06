import React from "react";

export default function ModalImagePreview() {
  return (
    <Modal
      size="98%"
      opened={false}
      title="Title"
      classNames={{
        inner: "p-4",
        modal: "h-full bg-black overflow-hidden",
        body: "h-full",
      }}
      styles={{ close: { zIndex: 3 }, title: { zIndex: 3 } }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="flex w-full h-full absolute rounded-lg"
          style={{
            backgroundImage: `url(${images[imageIndex].src})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            width: "calc(100% + 200px)",
            height: "calc(100% + 200px)",
            top: -100,
            left: -100,
            right: -100,
            bottom: -100,
            filter: "blur(7px) brightness(.7)",
          }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
            setDegree(0);
          }}
        ></motion.div>
        <motion.div
          key={page}
          className="flex w-full h-full absolute top-0 left-0"
          style={{ zIndex: 0 }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
            setDegree(0);
          }}
        >
          <div className="flex w-full h-full">
            <div className="flex-1 overflow-hidden relative">
              <div className="relative flex items-center justify-center w-full h-full">
                <motion.img
                  drag
                  whileTap={{
                    opacity: 1,
                    scale: 1.05,
                    boxShadow: "0px 5px 8px #222",
                    cursor: "grabbing",
                  }}
                  whileDrag={{
                    scale: 1.1,
                    boxShadow: "0px 10px 16px #222",
                  }}
                  animate={{
                    rotate: degree,
                    scale: newScale,
                  }}
                  transition={{ duration: 0.25 }}
                  dragConstraints={{
                    top: -200,
                    left: -200,
                    right: 200,
                    bottom: 200,
                  }}
                  src={images[imageIndex].src}
                  className="h-auto max-w-none flex-shrink-0 rounded-lg select-none cursor-grab"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div
        className="next"
        onClick={() => {
          paginate(1);
          setDegree(0);
        }}
      >
        <IconTreeTriangleRight />
      </div>
      <div
        className="prev"
        onClick={() => {
          paginate(-1);
          setDegree(0);
        }}
      >
        <IconTreeTriangleRight rotate={360} />
      </div>
      <div className="flex w-full h-14 absolute bottom-0 left-0 items-center px-3 py-2 z-10">
        <ActionIcon
          onClick={() => setDegree((d) => d + 90)}
          size={32}
          radius="md"
          className="hover:bg-gray-700"
        >
          <RotateClockwise2 size={20} color="white" />
        </ActionIcon>
        <ActionIcon
          size={32}
          radius="md"
          className="hover:bg-gray-700"
          onClick={() => {}}
        >
          <Minus size={20} color="white" />
        </ActionIcon>
        <div className="w-32">
          <Slider
            aria-label="Resize image"
            value={((newScale * 100 - 25) * 100) / 375}
            tipFormatter={(v) => `${Math.floor((v / 100) * 375 + 25)}%`}
            onChange={(v) => {
              setNewScale(((v / 100) * 375 + 25) / 100);
            }}
          ></Slider>
        </div>
        <ActionIcon
          size={32}
          radius="md"
          className="hover:bg-gray-700"
          onClick={() => {
            Math.floor(newScale / 25) < 16 &&
              setNewScale(Math.floor(newScale / 25) + 1);
          }}
        >
          <Plus size={20} color="white" />
        </ActionIcon>
      </div>
    </Modal>
  );
}
