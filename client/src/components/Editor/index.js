import React, { useCallback, useMemo, useRef, useState } from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import editorStyles from "./index.css";
import mentionsStyles from "./MentionsStyles.module.css";
import mentions from "./Mentions";
import "./index.css";
import { ActionIcon, Group, Button, Switch, Highlight } from "@mantine/core";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import {
  IconCalendarClock,
  IconPlus,
  IconBold,
  IconItalic,
  IconUnderline,
  IconList,
  IconOrderedList,
  IconQuote,
  IconCode,
  IconTerminal,
  IconExpand,
} from "@douyinfe/semi-icons";
import { BsMarkdown } from "react-icons/bs";
import { VscCaseSensitive } from "react-icons/vsc";
import { useHotkeys } from "@mantine/hooks";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";

function EntryMembers(props) {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;
  const index = parentProps.id.split("-").slice(-1)[0];
  useHotkeys([
    [
      `ctrl+${index}`,
      () => {
        parentProps.onMouseEnter();
      },
    ],
  ]);
  return (
    <div
      {...parentProps}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.avatar}
            className={theme?.mentionSuggestionsEntryAvatar}
            role="presentation"
          />
        </div>

        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>
            <Highlight highlight={searchValue}>{mention.name}</Highlight>
          </div>

          <div className={theme?.mentionSuggestionsEntryTitle}>
            {mention.title}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#a7a7a7",
        }}
      >
        Ctrl+{index}
      </div>
    </div>
  );
}

function EntryChannels(props) {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className={theme?.mentionSuggestionsEntryContainer}>
        <div className={theme?.mentionSuggestionsEntryContainerRight}>
          <div className={theme?.mentionSuggestionsEntryText}>
            <Highlight highlight={searchValue}>{mention.name}</Highlight>
          </div>
          {/* 
          <div className={theme?.mentionSuggestionsEntryTitle}>
            {mention.title}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default function EditorDraft() {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [openStaticToolbar, setOpenStaticToolbar] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [openChannels, setOpenChannels] = useState(false);
  const [suggestionsMembers, setSuggestionsMembers] = useState(mentions["@"]);
  const [suggestionsChannels, setSuggestionsChannels] = useState(mentions["#"]);

  const {
    MentionMembersSuggestions,
    MentionChannelsSuggestions,
    InlineToolbar,
    plugins,
  } = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const hashtagPlugin = createHashtagPlugin();
    const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();
    const mentionMembersPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      mentionPrefix: "@",
      supportWhitespace: true,
      mentionTrigger: "@",
    });
    const mentionChanelsPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      mentionPrefix: "#",
      supportWhitespace: true,
      mentionTrigger: "#",
    });
    // eslint-disable-next-line no-shadow
    const MentionMembersSuggestions = mentionMembersPlugin.MentionSuggestions;
    const MentionChannelsSuggestions = mentionChanelsPlugin.MentionSuggestions;
    const InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    // eslint-disable-next-line no-shadow
    const plugins = [
      mentionMembersPlugin,
      mentionChanelsPlugin,
      hashtagPlugin,
      markdownShortcutsPlugin,
      inlineToolbarPlugin,
    ];
    return {
      plugins,
      MentionMembersSuggestions,
      MentionChannelsSuggestions,
      InlineToolbar,
    };
  }, []);

  const onChange = useCallback((_editorState) => {
    setEditorState(_editorState);
  }, []);
  const onOpenMembersChange = useCallback((_open) => {
    setOpenMembers(_open);
  }, []);
  const onOpenChannelsChange = useCallback((_open) => {
    setOpenChannels(_open);
  }, []);
  const onSearchChangeMembers = useCallback(({ trigger, value }) => {
    setSuggestionsMembers(defaultSuggestionsFilter(value, mentions, trigger));
  }, []);
  const onSearchChangeChannels = useCallback(({ trigger, value }) => {
    setSuggestionsChannels(defaultSuggestionsFilter(value, mentions, trigger));
  }, []);

  return (
    <div className="mx-4 relative flex-shrink-0">
      <div
        style={{
          border: "1px solid #d5d5d5",
          borderRadius: 8,
          padding: 8,
          backgroundColor: "#fff",
        }}
      >
        {openStaticToolbar && (
          <Group
            position="apart"
            style={{
              marginBottom: 4,
            }}
          >
            <Group spacing="xs">
              <Group spacing={0}>
                <ActionIcon>
                  <IconBold />
                </ActionIcon>
                <ActionIcon>
                  <IconItalic />
                </ActionIcon>
                <ActionIcon>
                  <IconUnderline />
                </ActionIcon>
              </Group>
              <Group spacing={0}>
                <ActionIcon>
                  <IconList />
                </ActionIcon>
                <ActionIcon>
                  <IconOrderedList />
                </ActionIcon>
              </Group>
              <Group spacing={0}>
                <ActionIcon>
                  <IconQuote />
                </ActionIcon>
                <ActionIcon>
                  <IconCode />
                </ActionIcon>
                <ActionIcon>
                  <IconTerminal />
                </ActionIcon>
              </Group>
            </Group>
            <ActionIcon>
              <IconExpand />
            </ActionIcon>
          </Group>
        )}
        <div
          className={editorStyles.editor}
          onClick={() => {
            ref.current?.focus();
          }}
        >
          <Editor
            editorKey={"editor"}
            editorState={editorState}
            onChange={onChange}
            placeholder="test"
            plugins={plugins}
            ref={ref}
          />
          {!openStaticToolbar && <InlineToolbar />}
          <MentionMembersSuggestions
            open={openMembers}
            onOpenChange={onOpenMembersChange}
            suggestions={suggestionsMembers}
            onSearchChange={onSearchChangeMembers}
            onAddMention={(entry) => {
              // get the mention object selected
              console.log(entry);
            }}
            entryComponent={EntryMembers}
            popoverContainer={({ children }) => (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "calc(100% + 8px)",
                  cursor: "pointer",
                  border: "1px solid #d5d5d5",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {children}
              </div>
            )}
          />
          <MentionChannelsSuggestions
            open={openChannels}
            onOpenChange={onOpenChannelsChange}
            suggestions={suggestionsChannels}
            onSearchChange={onSearchChangeChannels}
            onAddMention={() => {
              // get the mention object selected
            }}
            entryComponent={EntryChannels}
            popoverContainer={({ children }) => (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "calc(100% + 8px)",
                  cursor: "pointer",
                  border: "1px solid #d5d5d5",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {children}
              </div>
            )}
          />
        </div>
        <Group
          position="apart"
          style={{
            marginTop: 4,
          }}
        >
          <Group spacing={0}>
            <ActionIcon>
              <IconPlus />
            </ActionIcon>
            <div
              style={{
                width: 1,
                height: 20,
                background: "black !important",
              }}
            ></div>
            <ActionIcon onClick={() => setOpenStaticToolbar((v) => !v)}>
              <VscCaseSensitive size={20} />
            </ActionIcon>
            <ActionIcon>
              <BsMarkdown size={20} />
            </ActionIcon>
          </Group>
          <Group spacing="xs">
            <Switch label="Preview" size="xs" />
            <Group
              spacing={0}
              style={{
                background: "#fafafa",
                borderRadius: 4,
              }}
            >
              <Button variant="subtle" size="xs" color="gray">
                Send now
              </Button>
              <div
                style={{
                  width: 1,
                  height: 20,
                  background: "black !important",
                }}
              ></div>
              <ActionIcon size={30}>
                <IconCalendarClock />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </div>
      <div className="flex w-full h-6 justify-end items-center pl-3 pr-2" style={{
          fontSize: 10,
      }}>
        <div><span className="font-semibold">Shift + Enter</span> to add a new line</div>
      </div>
    </div>
  );
}
