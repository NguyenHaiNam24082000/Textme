import React, { useState } from "react";

export default function ImagePreview() {
  const [openedImagePreview, setOpenedImagePreview] = useState(false);
  return (
    <AnimateSharedLayout type="crossfade">
      {/* <Image
                        withPlaceholder
                        width="80px"
                        height="80px"
                        fit="contain"
                        radius={4}
                        src={
                          embed.thumbnail.url && !Array.isArray(embed.image)
                            ? embed.image.url
                            : embed.image[0].url
                        }
                      /> */}
      <Image
        component="motion.img"
        className="w-20 h-20 rounded object-contain"
        onClick={() => setOpenedImagePreview(true)}
        layoutId={
          embed.thumbnail.url && !Array.isArray(embed.image)
            ? embed.image.url
            : embed.image[0].url
        }
        src={
          embed.thumbnail.url && !Array.isArray(embed.image)
            ? embed.image.url
            : embed.image[0].url
        }
      />
      <AnimatePresence>
        <Portal zIndex={100}>
          {openedImagePreview && (
            <div className="fixed inset-0 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                key="overlay"
                className="overlay -inset-20 z-50"
                style={{
                  // backgroundImage: `url(${
                  //   embed.thumbnail.url &&
                  //   !Array.isArray(embed.image)
                  //     ? embed.image.url
                  //     : embed.image[0].url
                  // })`,
                  inset: "-80px -80px -80px -80px",
                  backgroundColor: "rgba(0,0,0)",
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(7px) brightness(.7)",
                }}
                onClick={() => setOpenedImagePreview(false)}
              />
              <div
                className="single-image-container"
                // onClick={() => setSelectedId(null)}
              >
                <motion.img
                  key="image"
                  // index={images[selectedId].id}
                  className="single-image"
                  style={{ height: "auto" }}
                  layoutId={
                    embed.thumbnail.url && !Array.isArray(embed.image)
                      ? embed.image.url
                      : embed.image[0].url
                  }
                  src={
                    embed.thumbnail.url && !Array.isArray(embed.image)
                      ? embed.image.url
                      : embed.image[0].url
                  }
                />
              </div>
            </div>
          )}
        </Portal>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
