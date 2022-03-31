import React, { useState, useEffect } from "react";
import AvatarGenerator from "../../components/AvatarGenerator";
import {
  Group,
  Text,
  // Button,
  Checkbox,
  TextInput,
  Card,
  Image,
  SimpleGrid,
  ActionIcon,
  Slider,
} from "@mantine/core";
import {IMAGE_MIME_TYPE} from "@mantine/dropzone"
import { Button, SplitButtonGroup } from "@douyinfe/semi-ui";
// import InlineEdit from "@atlaskit/inline-edit";
import Modal from "../../components/Modals/Modal";
import { RiFileGifLine } from "react-icons/ri";
import Cropper from "react-easy-crop";
import { CSSTransition } from "react-transition-group";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { CgEditFlipV, CgEditFlipH } from "react-icons/cg";
import { FiRotateCw } from "react-icons/fi";
import { useModals } from "@mantine/modals";
import { useFileUpload } from "use-file-upload";
import { Banner } from "@douyinfe/semi-ui";
import Giphy from "../../components/Giphy";
import axios from "axios";
import { useForm } from "@mantine/hooks";

function Form({ checkImageFromUrl }) {
  const form = useForm({
    initialValues: {
      url: "",
    },
    validationRules: {
      url: (value) =>
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
          value
        ),
    },
    errorMessages: { url: "URL must be started with HTTP or HTTPS" },
  });

  return (
    <>
      <TextInput
        label="Paste an image link..."
        className="mb-2"
        {...form.getInputProps("url")}
        onBlur={() => form.validateField("url")}
      />
      <Button
        block
        onClick={() => {
          checkImageFromUrl(form.values.url);
          // modals.closeModal(id)
        }}
      >
        Submit
      </Button>
    </>
  );
}

export default function AccountDetail() {
  const [editValue, setEditValue] = useState("NguyenHaiNam");
  const [handleGenerateAvatar, setHandleGenerateAvatar] = useState(false);
  const [openedUploadAvatar, setOpenedUploadAvatar] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main");
  const [size, setSize] = useState(null);
  const [colors, setColors] = useState(null);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [rotate, setRotate] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, selectFile] = useFileUpload();
  const [selectedImage, setSelectedImage] = useState({
    selected: false,
    file: null,
  });
  const modals = useModals();
  useEffect(async () => {
    setColors(
      await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
        (response) => response.json()
      )
    );
  }, []);

  const checkImageFromUrl = async (url) => {
    await axios.get(url).then((response) => {
      if (
        response.status == 200 &&
        IMAGE_MIME_TYPE.includes(response.headers["content-type"])
      ) {
        alert("image exists");
      } else {
        alert("image doesn't exist");
      }
    });
  };

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      className: "shake",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  const openContentModal = () => {
    const id = modals.openModal({
      title: "Link",
      centered: true,
      children: <Form checkImageFromUrl={checkImageFromUrl} />,
    });
  };

  const calcSize = (el) => {
    const { width, height } = el.getBoundingClientRect();
    setSize({ width, height });
  };

  const handleRotationChange = (e) => {};

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="inline-flex flex-col items-center w-auto">
        <Text className="text-2xl my-4" weight={700}>
          Your account is nearly ready
        </Text>
        <Text className="text-sm my-3 text-slate-400">
          Check your details before creating an account on Textme
        </Text>
        {colors && (
          <AvatarGenerator
            value={editValue}
            handleGenerateAvatar={handleGenerateAvatar}
            colors={colors}
          />
        )}
        <Group
          direction="column"
          spacing={0}
          className="rounded-lg w-full mt-3"
          style={{ border: "1px solid #e1e1e1" }}
        >
          <Group grow className="w-full px-3">
            <Text className="text-sm my-4" weight={700}>
              Information from GitLab
            </Text>
          </Group>
          <Group
            grow
            className="w-full px-3 mb-3 items-center"
            style={{ borderTop: "1px solid #e1e1e1" }}
            position="apart"
          >
            <TextInput
                  value={editValue}
                  className="w-full"
                  size="xs"
                  onChange={(event) => setEditValue(event.currentTarget.value)}
                />
            {/* <InlineEdit
              defaultValue={editValue}
              label="Display name"
              onConfirm={(value) => setEditValue(value)}
              placeholder="Click to enter text"
              editView={({ errorMessage, ...fieldProps }) => (
                <TextInput
                  value={editValue}
                  className="w-full"
                  size="xs"
                  onChange={(event) => setEditValue(event.currentTarget.value)}
                />
              )}
              readView={() => (
                <div>{editValue || "Click to enter a value"}</div>
              )}
              // onConfirm={(value) => setEditValue(value)}
            /> */}
            <Checkbox
              label="Use"
              size="xs"
              checked
              disabled
              classNames={{ root: "flex-row-reverse", label: "mr-3" }}
            />
          </Group>
        </Group>
        <Button
          radius="md"
          className="mt-4 w-full bg-yellow-400"
          onClick={() =>
            setHandleGenerateAvatar((v) => {
              return !v;
            })
          }
        >
          Generate avatar
        </Button>
        <Button radius="md" className="mt-4 w-full bg-yellow-400">
          Continue
        </Button>
      </div>
      <Modal
        size={activeMenu === "main" ? "md" : "lg"}
        opened={false}
        onClose={() => setOpenedUploadAvatar(false)}
        title={
          <div className="flex items-center">
            {activeMenu !== "main" && (
              <ActionIcon
                radius="xl"
                className="mr-2"
                onClick={() => setActiveMenu("main")}
              >
                <IoMdArrowRoundBack />
              </ActionIcon>
            )}
            <div>{activeMenu === "main" ? "Upload avatar" : "Edit avatar"}</div>
          </div>
        }
        className="w-full h-full overflow-hidden"
        classNames={{ modal: "overflow-hidden", body: "overflow-hidden" }}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={250}
          classNames="menu-primary"
          unmountOnExit
        >
          <div className="flex flex-col gap-2">
            {!selectedImage.selected && (
              <Banner
                type={file?.size > 5242880 ? "danger" : "warning"}
                description={
                  file?.size > 5242880
                    ? "File size is too large"
                    : "No file selected"
                }
              />
            )}
            <SimpleGrid cols={2} className="overflow-hidden">
              <Card
                padding="sm"
                radius="md"
                component="button"
                onClick={() => {
                  // Single File Upload
                  setSelectedImage({ selected: false, file: null });
                  selectFile(
                    { accept: "image/*" },
                    ({ source, name, size, file }) => {
                      // file - is the raw File Object
                      console.log({ source, name, size, file });
                      if (size > 5242880) {
                        return;
                      }
                      setSelectedImage({
                        selected: true,
                        file: { source, name, size, file },
                      });
                      setActiveMenu("edit");
                      // Todo: Upload to cloud.
                    }
                  );
                }}
                className={`flex flex-col items-center justify-center border-none bg-slate-100 cursor-pointer
            `}
              >
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets8.lottiefiles.com/packages/lf20_GxMZME.json"
                  style={{ width: 128, height: 128 }}
                  className="bg-yellow-400 rounded-full"
                ></lottie-player>

                <Text weight={500} size="md" className="text-inherit">
                  Upload File (PNG,JPG,GIF)
                </Text>
              </Card>
              <Card
                padding="sm"
                radius="md"
                component="button"
                onClick={() => setActiveMenu("animated")}
                className={`animated-avatar flex flex-col items-center justify-center relative border-none bg-slate-100 cursor-pointer`}
              >
                <div className="cutout-container absolute w-12 h-12 z-10">
                  <div
                    className="bg-white relative w-full h-full"
                    style={{ transition: "all 0.2s ease-out 0s" }}
                  >
                    <div className="cutout w-4 h-4 pointer-events-none absolute -top-16 right-0"></div>
                  </div>
                </div>
                <div className="relative">
                  <SimpleGrid
                    cols={2}
                    spacing={0}
                    className="rounded-full overflow-hidden"
                  >
                    <Image
                      src={
                        "https://media0.giphy.com/media/gx54W1mSpeYMg/giphy.gif"
                      }
                      height={64}
                      width={64}
                      // alt="private workspace"
                    />
                    <Image
                      src={
                        "https://media1.giphy.com/media/3NseAxogtImyqK29wc/giphy.gif"
                      }
                      height={64}
                      width={64}
                      // alt="private workspace"
                    />
                    <Image
                      src={
                        "https://media0.giphy.com/media/fZdzEHC8sMC0E/giphy.gif"
                      }
                      height={64}
                      width={64}
                      // alt="private workspace"
                    />
                    <Image
                      src={
                        "https://media1.giphy.com/media/sbOfpZkFNsJUI/giphy.gif"
                      }
                      height={64}
                      width={64}
                      // alt="private workspace"
                    />
                  </SimpleGrid>
                  <div className="flex justify-center items-center absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-slate-200 opacity-80 rounded-full">
                    <RiFileGifLine size={32} />
                  </div>
                </div>

                <Text weight={500} size="md" className="text-inherit">
                  Animated Avatar (From Giphy)
                </Text>
              </Card>
              <Card
                padding="sm"
                radius="md"
                component="button"
                onClick={() => setActiveMenu("unsplash")}
                className={`flex flex-col items-center justify-center border-none bg-slate-100 cursor-pointer
            `}
              >
                <div className="flex justify-center items-center w-32 h-32 shadow-md rounded-2xl bg-white">
                  <Image
                    src={
                      "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/unsplash-logo-freelogovectors.net_-400x400.png"
                    }
                    height={64}
                    width={64}
                    // alt="private workspace"
                  />
                </div>

                <Text weight={500} size="md" className="text-inherit">
                  Unsplash
                  <br />
                  (Beautiful Images)
                </Text>
              </Card>
              <Card
                padding="sm"
                radius="md"
                component="button"
                onClick={openContentModal}
                className={`flex flex-col items-center justify-center relative border-none bg-slate-100 cursor-pointer`}
              >
                <div className="relative">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets3.lottiefiles.com/private_files/lf30_BQDoDk.json"
                    style={{ width: 128, height: 128 }}
                    className="bg-yellow-400 rounded-full"
                  ></lottie-player>
                </div>

                <Text weight={500} size="md" className="text-inherit">
                  More Images
                  <br />
                  (From Link)
                </Text>
              </Card>
            </SimpleGrid>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "edit"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div className="flex flex-col w-full h-full gap-4">
            <div className="flex w-full h-96 bg-black rounded-lg overflow-hidden relative">
              <Cropper
                image={selectedImage?.file?.source}
                crop={crop}
                zoom={zoom}
                aspect={1}
                rotation={rotate}
                cropShape="round"
                onRotationChange={handleRotationChange}
                onCropChange={setCrop}
                onCropComplete={() => {}}
                onZoomChange={setZoom}
                transform={[
                  `translate(${crop.x}px, ${crop.y}px)`,
                  `rotateZ(${rotate}deg)`,
                  `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                  `rotateX(${flip.vertical ? 180 : 0}deg)`,
                  `scale(${zoom})`,
                ].join(" ")}
                style={{ cropAreaStyle: { border: "5px solid #fff" } }}
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <ActionIcon
                onClick={() => {
                  setRotate(rotate + 90);
                  setFlip({
                    horizontal: !flip.horizontal,
                    vertical: !flip.vertical,
                  });
                }}
              >
                <FiRotateCw className="w-6 h-6" />
              </ActionIcon>
              <div className="flex items-center gap-2 w-full">
                <BsFillImageFill className="w-4 h-4" />
                <Slider
                  className="w-full"
                  label={null}
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={setZoom}
                />
                <BsFillImageFill className="w-7 h-7" />
              </div>
              <ActionIcon
                onClick={() => {
                  setFlip({ ...flip, horizontal: !flip.horizontal });
                }}
              >
                <CgEditFlipH className="w-6 h-6" />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  setFlip({ ...flip, vertical: !flip.vertical });
                }}
              >
                <CgEditFlipV className="w-6 h-6" />
              </ActionIcon>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button>Frame</Button>
                <Button>Filter</Button>
              </div>
              <div className="flex gap-2">
                <Button type="danger" onClick={openConfirmModal}>
                  Cancle
                </Button>
                <Button>Apply</Button>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "animated"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <Giphy />
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "unsplash"}
          timeout={250}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div>aaaa</div>
        </CSSTransition>
      </Modal>
    </div>
  );
}
