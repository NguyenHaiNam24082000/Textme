import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
import {
  ActionIcon,
  Select,
  Spoiler,
  Popper,
  Paper,
  Center,
  Autocomplete,
  ScrollArea,
  Group,
  TextInput,
  Image,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modals/Modal";
import axios from "axios";
// import Highlighter from "react-highlight-words";
// import { useClickOutside } from "@mantine/hooks";
import IconOther from "../../../assets/images/icons/files-other.svg";

const languages = [
  "1c",
  // "4d",
  // "sap-abap",
  // "abap",
  "abnf",
  "accesslog",
  "ada",
  "arduino",
  "ino",
  "armasm",
  "arm",
  "avrasm",
  "actionscript",
  "as",
  // "alan",
  // "i",
  // "ln",
  "angelscript",
  "asc",
  "apache",
  "apacheconf",
  "applescript",
  "osascript",
  "arcade",
  "asciidoc",
  "adoc",
  "aspectj",
  "autohotkey",
  "autoit",
  "awk",
  "mawk",
  "nawk",
  "gawk",
  "bash",
  "sh",
  "zsh",
  "basic",
  // "bbcode",
  // "blade",
  "bnf",
  "brainfuck",
  "bf",
  "csharp",
  "cs",
  "c",
  "h",
  "cpp",
  "hpp",
  "cc",
  "hh",
  "c++",
  "h++",
  "cxx",
  "hxx",
  "cal",
  "cos",
  "cls",
  "cmake",
  "cmake.in",
  "coq",
  "csp",
  "css",
  "capnproto",
  "capnp",
  // "chaos",
  // "kaos",
  // "chapel",
  // "chpl",
  // "cisco",
  "clojure",
  "clj",
  "coffeescript",
  "coffee",
  "cson",
  "iced",
  "cpc",
  "crmsh",
  "crm",
  "pcmk",
  "crystal",
  "cr",
  "curl",
  "cypher",
  "d",
  // "dafny",
  "dart",
  "dpr",
  "dfm",
  "pas",
  "pascal",
  "diff",
  "patch",
  "django",
  "jinja",
  "dns",
  "zone",
  "bind",
  "dockerfile",
  "docker",
  "dos",
  "bat",
  "cmd",
  "dsconfig",
  "dts",
  "dust",
  "dst",
  // "dylan",
  "ebnf",
  "elixir",
  "elm",
  "erlang",
  "erl",
  "excel",
  "xls",
  "xlsx",
  // "extempore",
  // "xtlang",
  // "xtm",
  "fsharp",
  "fs",
  "fix",
  "fortran",
  "f90",
  "f95",
  "gcode",
  "nc",
  "gams",
  "gms",
  "gauss",
  "gss",
  // "godot",
  // "gdscript",
  "gherkin",
  "hbs",
  // "glimmer",
  "html.hbs",
  "html.handlebars",
  // "htmlbars",
  // "gn",
  // "gni",
  "go",
  "golang",
  "gf",
  "golo",
  "gololang",
  "gradle",
  "graphql",
  "groovy",
  // "gsql",
  "xml",
  "html",
  "xhtml",
  "rss",
  "atom",
  "xjb",
  "xsd",
  "xsl",
  "plist",
  "svg",
  "http",
  "https",
  "haml",
  "handlebars",
  "haskell",
  "hs",
  "haxe",
  "hx",
  "hlsl",
  "hy",
  "hylang",
  "ini",
  "toml",
  "inform7",
  "i7",
  "irpf90",
  "json",
  "java",
  "jsp",
  "javascript",
  "js",
  "jsx",
  "jolie",
  "iol",
  "ol",
  "julia",
  "julia-repl",
  "kotlin",
  "kt",
  "tex",
  "leaf",
  "lean",
  "lasso",
  "ls",
  "lassoscript",
  "less",
  "ldif",
  "lisp",
  "livecodeserver",
  "livescript",
  "lua",
  "macaulay2",
  "makefile",
  "mk",
  "mak",
  "make",
  "markdown",
  "md",
  "mkdown",
  "mkd",
  "mathematica",
  "mma",
  "wl",
  "matlab",
  "maxima",
  "mel",
  "mercury",
  "mirc",
  "mrc",
  "mizar",
  "mkb",
  "mojolicious",
  "monkey",
  "moonscript",
  "moon",
  "n1ql",
  "nsis",
  "never",
  "nginx",
  "nginxconf",
  "nim",
  "nimrod",
  "nix",
  "ocl",
  "ocaml",
  "ml",
  "objectivec",
  "mm",
  "objc",
  "obj-c",
  "obj-c++",
  "objective-c++",
  "glsl",
  "openscad",
  "scad",
  "ruleslanguage",
  "oxygene",
  "pf",
  "pf.conf",
  "php",
  "papyrus",
  "psc",
  "parser3",
  "perl",
  "pl",
  "pm",
  "pine",
  "pinescript",
  "plaintext",
  "txt",
  "text",
  "pony",
  "pgsql",
  "postgres",
  "postgresql",
  "powershell",
  "ps",
  "ps1",
  "processing",
  "prolog",
  "properties",
  "protobuf",
  "puppet",
  "pp",
  "python",
  "py",
  "gyp",
  "profile",
  "python-repl",
  "pycon",
  "qsharp",
  "k",
  "kdb",
  "qml",
  "r",
  "cshtml",
  "razor",
  "razor-cshtml",
  "reasonml",
  "re",
  "redbol",
  "rebol",
  "red",
  "red-system",
  "rib",
  "rsl",
  "risc",
  "riscript",
  "graph",
  "instances",
  "robot",
  "rf",
  "rpm-specfile",
  "rpm",
  "spec",
  "rpm-spec",
  "specfile",
  "ruby",
  "rb",
  "gemspec",
  "podspec",
  "thor",
  "irb",
  "rust",
  "rs",
  "SAS",
  "sas",
  "scss",
  "sql",
  "p21",
  "step",
  "stp",
  "scala",
  "scheme",
  "scilab",
  "sci",
  "shexc",
  "shell",
  "console",
  "smali",
  "smalltalk",
  "st",
  "sml",
  "solidity",
  "sol",
  "spl",
  "stan",
  "stanfuncs",
  "stata",
  "iecst",
  "scl",
  "stl",
  "structured-text",
  "stylus",
  "styl",
  "subunit",
  "supercollider",
  "sc",
  "svelte",
  "swift",
  "tcl",
  "tk",
  "terraform",
  "tf",
  "hcl",
  "tap",
  "thrift",
  "tp",
  "tsql",
  "twig",
  "craftcms",
  "typescript",
  "ts",
  "unicorn-rails-log",
  "vbnet",
  "vb",
  "vba",
  "vbscript",
  "vbs",
  "vhdl",
  "vala",
  "verilog",
  "v",
  "vim",
  "xsharp",
  "xs",
  "prg",
  "axapta",
  "x++",
  "x86asm",
  "xl",
  "tao",
  "xquery",
  "xpath",
  "xq",
  "yml",
  "yaml",
  "zenscript",
  "zs",
  "zephir",
  "zep",
];

const codeThemes = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "A11 Y Dark",
    value: "a11y-dark",
  },
  {
    name: "A11 Y Light",
    value: "a11y-light",
  },
  {
    name: "Agate",
    value: "agate",
  },
  {
    name: "An Old Hope",
    value: "an-old-hope",
  },
  {
    name: "Android Studio",
    value: "androidstudio",
  },
  {
    name: "Arduino Light",
    value: "arduino-light",
  },
  {
    name: "Arta",
    value: "arta",
  },
  {
    name: "Ascetic",
    value: "ascetic",
  },
  {
    name: "Atom One Dark",
    value: "atom-one-dark",
  },
  {
    name: "Atom One Dark Reasonable",
    value: "atom-one-dark-reasonable",
  },
  {
    name: "Atom One Light",
    value: "atom-one-light",
  },
  {
    name: "Base16 / 3024",
    value: "base16/3024",
  },
  {
    name: "Base16 / Apathy",
    value: "base16/apathy",
  },
  {
    name: "Base16 / Apprentice",
    value: "base16/apprentice",
  },
  {
    name: "Base16 / Ashes",
    value: "base16/ashes",
  },
  {
    name: "Base16 / Atelier Cave",
    value: "base16/atelier-cave",
  },
  {
    name: "Base16 / Atelier Cave Light",
    value: "base16/atelier-cave-light",
  },
  {
    name: "Base16 / Atelier Dune",
    value: "base16/atelier-dune",
  },
  {
    name: "Base16 / Atelier Dune Light",
    value: "base16/atelier-dune-light",
  },
  {
    name: "Base16 / Atelier Estuary",
    value: "base16/atelier-estuary",
  },
  {
    name: "Base16 / Atelier Estuary Light",
    value: "base16/atelier-estuary-light",
  },
  {
    name: "Base16 / Atelier Forest",
    value: "base16/atelier-forest",
  },
  {
    name: "Base16 / Atelier Forest Light",
    value: "base16/atelier-forest-light",
  },
  {
    name: "Base16 / Atelier Heath",
    value: "base16/atelier-heath",
  },
  {
    name: "Base16 / Atelier Heath Light",
    value: "base16/atelier-heath-light",
  },
  {
    name: "Base16 / Atelier Lakeside",
    value: "base16/atelier-lakeside",
  },
  {
    name: "Base16 / Atelier Lakeside Light",
    value: "base16/atelier-lakeside-light",
  },
  {
    name: "Base16 / Atelier Plateau",
    value: "base16/atelier-plateau",
  },
  {
    name: "Base16 / Atelier Plateau Light",
    value: "base16/atelier-plateau-light",
  },
  {
    name: "Base16 / Atelier Savanna",
    value: "base16/atelier-savanna",
  },
  {
    name: "Base16 / Atelier Savanna Light",
    value: "base16/atelier-savanna-light",
  },
  {
    name: "Base16 / Atelier Seaside",
    value: "base16/atelier-seaside",
  },
  {
    name: "Base16 / Atelier Seaside Light",
    value: "base16/atelier-seaside-light",
  },
  {
    name: "Base16 / Atelier Sulphurpool",
    value: "base16/atelier-sulphurpool",
  },
  {
    name: "Base16 / Atelier Sulphurpool Light",
    value: "base16/atelier-sulphurpool-light",
  },
  {
    name: "Base16 / Atlas",
    value: "base16/atlas",
  },
  {
    name: "Base16 / Bespin",
    value: "base16/bespin",
  },
  {
    name: "Base16 / Black Metal",
    value: "base16/black-metal",
  },
  {
    name: "Base16 / Black Metal Bathory",
    value: "base16/black-metal-bathory",
  },
  {
    name: "Base16 / Black Metal Burzum",
    value: "base16/black-metal-burzum",
  },
  {
    name: "Base16 / Black Metal Dark Funeral",
    value: "base16/black-metal-dark-funeral",
  },
  {
    name: "Base16 / Black Metal Gorgoroth",
    value: "base16/black-metal-gorgoroth",
  },
  {
    name: "Base16 / Black Metal Immortal",
    value: "base16/black-metal-immortal",
  },
  {
    name: "Base16 / Black Metal Khold",
    value: "base16/black-metal-khold",
  },
  {
    name: "Base16 / Black Metal Marduk",
    value: "base16/black-metal-marduk",
  },
  {
    name: "Base16 / Black Metal Mayhem",
    value: "base16/black-metal-mayhem",
  },
  {
    name: "Base16 / Black Metal Nile",
    value: "base16/black-metal-nile",
  },
  {
    name: "Base16 / Black Metal Venom",
    value: "base16/black-metal-venom",
  },
  {
    name: "Base16 / Brewer",
    value: "base16/brewer",
  },
  {
    name: "Base16 / Bright",
    value: "base16/bright",
  },
  {
    name: "Base16 / Brogrammer",
    value: "base16/brogrammer",
  },
  {
    name: "Base16 / Brush Trees",
    value: "base16/brush-trees",
  },
  {
    name: "Base16 / Brush Trees Dark",
    value: "base16/brush-trees-dark",
  },
  {
    name: "Base16 / Chalk",
    value: "base16/chalk",
  },
  {
    name: "Base16 / Circus",
    value: "base16/circus",
  },
  {
    name: "Base16 / Classic Dark",
    value: "base16/classic-dark",
  },
  {
    name: "Base16 / Classic Light",
    value: "base16/classic-light",
  },
  {
    name: "Base16 / Codeschool",
    value: "base16/codeschool",
  },
  {
    name: "Base16 / Colors",
    value: "base16/colors",
  },
  {
    name: "Base16 / Cupcake",
    value: "base16/cupcake",
  },
  {
    name: "Base16 / Cupertino",
    value: "base16/cupertino",
  },
  {
    name: "Base16 / Danqing",
    value: "base16/danqing",
  },
  {
    name: "Base16 / Darcula",
    value: "base16/darcula",
  },
  {
    name: "Base16 / Dark Violet",
    value: "base16/dark-violet",
  },
  {
    name: "Base16 / Darkmoss",
    value: "base16/darkmoss",
  },
  {
    name: "Base16 / Darktooth",
    value: "base16/darktooth",
  },
  {
    name: "Base16 / Decaf",
    value: "base16/decaf",
  },
  {
    name: "Base16 / Default Dark",
    value: "base16/default-dark",
  },
  {
    name: "Base16 / Default Light",
    value: "base16/default-light",
  },
  {
    name: "Base16 / Dirtysea",
    value: "base16/dirtysea",
  },
  {
    name: "Base16 / Dracula",
    value: "base16/dracula",
  },
  {
    name: "Base16 / Edge Dark",
    value: "base16/edge-dark",
  },
  {
    name: "Base16 / Edge Light",
    value: "base16/edge-light",
  },
  {
    name: "Base16 / Eighties",
    value: "base16/eighties",
  },
  {
    name: "Base16 / Embers",
    value: "base16/embers",
  },
  {
    name: "Base16 / Equilibrium Dark",
    value: "base16/equilibrium-dark",
  },
  {
    name: "Base16 / Equilibrium Gray Dark",
    value: "base16/equilibrium-gray-dark",
  },
  {
    name: "Base16 / Equilibrium Gray Light",
    value: "base16/equilibrium-gray-light",
  },
  {
    name: "Base16 / Equilibrium Light",
    value: "base16/equilibrium-light",
  },
  {
    name: "Base16 / Espresso",
    value: "base16/espresso",
  },
  {
    name: "Base16 / Eva",
    value: "base16/eva",
  },
  {
    name: "Base16 / Eva Dim",
    value: "base16/eva-dim",
  },
  {
    name: "Base16 / Flat",
    value: "base16/flat",
  },
  {
    name: "Base16 / Framer",
    value: "base16/framer",
  },
  {
    name: "Base16 / Fruit Soda",
    value: "base16/fruit-soda",
  },
  {
    name: "Base16 / Gigavolt",
    value: "base16/gigavolt",
  },
  {
    name: "Base16 / Github",
    value: "base16/github",
  },
  {
    name: "Base16 / Google Dark",
    value: "base16/google-dark",
  },
  {
    name: "Base16 / Google Light",
    value: "base16/google-light",
  },
  {
    name: "Base16 / Grayscale Dark",
    value: "base16/grayscale-dark",
  },
  {
    name: "Base16 / Grayscale Light",
    value: "base16/grayscale-light",
  },
  {
    name: "Base16 / Green Screen",
    value: "base16/green-screen",
  },
  {
    name: "Base16 / Gruvbox Dark Hard",
    value: "base16/gruvbox-dark-hard",
  },
  {
    name: "Base16 / Gruvbox Dark Medium",
    value: "base16/gruvbox-dark-medium",
  },
  {
    name: "Base16 / Gruvbox Dark Pale",
    value: "base16/gruvbox-dark-pale",
  },
  {
    name: "Base16 / Gruvbox Dark Soft",
    value: "base16/gruvbox-dark-soft",
  },
  {
    name: "Base16 / Gruvbox Light Hard",
    value: "base16/gruvbox-light-hard",
  },
  {
    name: "Base16 / Gruvbox Light Medium",
    value: "base16/gruvbox-light-medium",
  },
  {
    name: "Base16 / Gruvbox Light Soft",
    value: "base16/gruvbox-light-soft",
  },
  {
    name: "Base16 / Hardcore",
    value: "base16/hardcore",
  },
  {
    name: "Base16 / Harmonic 16 Dark",
    value: "base16/harmonic-16-dark",
  },
  {
    name: "Base16 / Harmonic 16 Light",
    value: "base16/harmonic-16-light",
  },
  {
    name: "Base16 / Heetch Dark",
    value: "base16/heetch-dark",
  },
  {
    name: "Base16 / Heetch Light",
    value: "base16/heetch-light",
  },
  {
    name: "Base16 / Helios",
    value: "base16/helios",
  },
  {
    name: "Base16 / Hopscotch",
    value: "base16/hopscotch",
  },
  {
    name: "Base16 / Horizon Dark",
    value: "base16/horizon-dark",
  },
  {
    name: "Base16 / Horizon Light",
    value: "base16/horizon-light",
  },
  {
    name: "Base16 / Humanoid Dark",
    value: "base16/humanoid-dark",
  },
  {
    name: "Base16 / Humanoid Light",
    value: "base16/humanoid-light",
  },
  {
    name: "Base16 / Ia Dark",
    value: "base16/ia-dark",
  },
  {
    name: "Base16 / Ia Light",
    value: "base16/ia-light",
  },
  {
    name: "Base16 / Icy Dark",
    value: "base16/icy-dark",
  },
  {
    name: "Base16 / Ir Black",
    value: "base16/ir-black",
  },
  {
    name: "Base16 / Isotope",
    value: "base16/isotope",
  },
  {
    name: "Base16 / Kimber",
    value: "base16/kimber",
  },
  {
    name: "Base16 / London Tube",
    value: "base16/london-tube",
  },
  {
    name: "Base16 / Macintosh",
    value: "base16/macintosh",
  },
  {
    name: "Base16 / Marrakesh",
    value: "base16/marrakesh",
  },
  {
    name: "Base16 / Materia",
    value: "base16/materia",
  },
  {
    name: "Base16 / Material",
    value: "base16/material",
  },
  {
    name: "Base16 / Material Darker",
    value: "base16/material-darker",
  },
  {
    name: "Base16 / Material Lighter",
    value: "base16/material-lighter",
  },
  {
    name: "Base16 / Material Palenight",
    value: "base16/material-palenight",
  },
  {
    name: "Base16 / Material Vivid",
    value: "base16/material-vivid",
  },
  {
    name: "Base16 / Mellow Purple",
    value: "base16/mellow-purple",
  },
  {
    name: "Base16 / Mexico Light",
    value: "base16/mexico-light",
  },
  {
    name: "Base16 / Mocha",
    value: "base16/mocha",
  },
  {
    name: "Base16 / Monokai",
    value: "base16/monokai",
  },
  {
    name: "Base16 / Nebula",
    value: "base16/nebula",
  },
  {
    name: "Base16 / Nord",
    value: "base16/nord",
  },
  {
    name: "Base16 / Nova",
    value: "base16/nova",
  },
  {
    name: "Base16 / Ocean",
    value: "base16/ocean",
  },
  {
    name: "Base16 / Oceanicnext",
    value: "base16/oceanicnext",
  },
  {
    name: "Base16 / One Light",
    value: "base16/one-light",
  },
  {
    name: "Base16 / Onedark",
    value: "base16/onedark",
  },
  {
    name: "Base16 / Outrun Dark",
    value: "base16/outrun-dark",
  },
  {
    name: "Base16 / Papercolor Dark",
    value: "base16/papercolor-dark",
  },
  {
    name: "Base16 / Papercolor Light",
    value: "base16/papercolor-light",
  },
  {
    name: "Base16 / Paraiso",
    value: "base16/paraiso",
  },
  {
    name: "Base16 / Pasque",
    value: "base16/pasque",
  },
  {
    name: "Base16 / Phd",
    value: "base16/phd",
  },
  {
    name: "Base16 / Pico",
    value: "base16/pico",
  },
  {
    name: "Base16 / Pop",
    value: "base16/pop",
  },
  {
    name: "Base16 / Porple",
    value: "base16/porple",
  },
  {
    name: "Base16 / Qualia",
    value: "base16/qualia",
  },
  {
    name: "Base16 / Railscasts",
    value: "base16/railscasts",
  },
  {
    name: "Base16 / Rebecca",
    value: "base16/rebecca",
  },
  {
    name: "Base16 / Ros Pine",
    value: "base16/ros-pine",
  },
  {
    name: "Base16 / Ros Pine Dawn",
    value: "base16/ros-pine-dawn",
  },
  {
    name: "Base16 / Ros Pine Moon",
    value: "base16/ros-pine-moon",
  },
  {
    name: "Base16 / Sagelight",
    value: "base16/sagelight",
  },
  {
    name: "Base16 / Sandcastle",
    value: "base16/sandcastle",
  },
  {
    name: "Base16 / Seti Ui",
    value: "base16/seti-ui",
  },
  {
    name: "Base16 / Shapeshifter",
    value: "base16/shapeshifter",
  },
  {
    name: "Base16 / Silk Dark",
    value: "base16/silk-dark",
  },
  {
    name: "Base16 / Silk Light",
    value: "base16/silk-light",
  },
  {
    name: "Base16 / Snazzy",
    value: "base16/snazzy",
  },
  {
    name: "Base16 / Solar Flare",
    value: "base16/solar-flare",
  },
  {
    name: "Base16 / Solar Flare Light",
    value: "base16/solar-flare-light",
  },
  {
    name: "Base16 / Solarized Dark",
    value: "base16/solarized-dark",
  },
  {
    name: "Base16 / Solarized Light",
    value: "base16/solarized-light",
  },
  {
    name: "Base16 / Spacemacs",
    value: "base16/spacemacs",
  },
  {
    name: "Base16 / Summercamp",
    value: "base16/summercamp",
  },
  {
    name: "Base16 / Summerfruit Dark",
    value: "base16/summerfruit-dark",
  },
  {
    name: "Base16 / Summerfruit Light",
    value: "base16/summerfruit-light",
  },
  {
    name: "Base16 / Synth Midnight Terminal Dark",
    value: "base16/synth-midnight-terminal-dark",
  },
  {
    name: "Base16 / Synth Midnight Terminal Light",
    value: "base16/synth-midnight-terminal-light",
  },
  {
    name: "Base16 / Tango",
    value: "base16/tango",
  },
  {
    name: "Base16 / Tender",
    value: "base16/tender",
  },
  {
    name: "Base16 / Tomorrow",
    value: "base16/tomorrow",
  },
  {
    name: "Base16 / Tomorrow Night",
    value: "base16/tomorrow-night",
  },
  {
    name: "Base16 / Twilight",
    value: "base16/twilight",
  },
  {
    name: "Base16 / Unikitty Dark",
    value: "base16/unikitty-dark",
  },
  {
    name: "Base16 / Unikitty Light",
    value: "base16/unikitty-light",
  },
  {
    name: "Base16 / Vulcan",
    value: "base16/vulcan",
  },
  {
    name: "Base16 / Windows 10",
    value: "base16/windows-10",
  },
  {
    name: "Base16 / Windows 10 Light",
    value: "base16/windows-10-light",
  },
  {
    name: "Base16 / Windows 95",
    value: "base16/windows-95",
  },
  {
    name: "Base16 / Windows 95 Light",
    value: "base16/windows-95-light",
  },
  {
    name: "Base16 / Windows High Contrast",
    value: "base16/windows-high-contrast",
  },
  {
    name: "Base16 / Windows High Contrast Light",
    value: "base16/windows-high-contrast-light",
  },
  {
    name: "Base16 / Windows Nt",
    value: "base16/windows-nt",
  },
  {
    name: "Base16 / Windows Nt Light",
    value: "base16/windows-nt-light",
  },
  {
    name: "Base16 / Woodland",
    value: "base16/woodland",
  },
  {
    name: "Base16 / Xcode Dusk",
    value: "base16/xcode-dusk",
  },
  {
    name: "Base16 / Zenburn",
    value: "base16/zenburn",
  },
  {
    name: "Brown Paper",
    value: "brown-paper",
  },
  {
    name: "Codepen Embed",
    value: "codepen-embed",
  },
  {
    name: "Color Brewer",
    value: "color-brewer",
  },
  {
    name: "Dark",
    value: "dark",
  },
  {
    name: "Devibeans",
    value: "devibeans",
  },
  {
    name: "Docco",
    value: "docco",
  },
  {
    name: "Far",
    value: "far",
  },
  {
    name: "Felipec",
    value: "felipec",
  },
  {
    name: "Foundation",
    value: "foundation",
  },
  {
    name: "Github",
    value: "github",
  },
  {
    name: "Github Dark",
    value: "github-dark",
  },
  {
    name: "Github Dark Dimmed",
    value: "github-dark-dimmed",
  },
  {
    name: "Gml",
    value: "gml",
  },
  {
    name: "Googlecode",
    value: "googlecode",
  },
  {
    name: "Gradient Dark",
    value: "gradient-dark",
  },
  {
    name: "Gradient Light",
    value: "gradient-light",
  },
  {
    name: "Grayscale",
    value: "grayscale",
  },
  {
    name: "Hybrid",
    value: "hybrid",
  },
  {
    name: "Idea",
    value: "idea",
  },
  {
    name: "Intellij Light",
    value: "intellij-light",
  },
  {
    name: "Ir Black",
    value: "ir-black",
  },
  {
    name: "Isbl Editor Dark",
    value: "isbl-editor-dark",
  },
  {
    name: "Isbl Editor Light",
    value: "isbl-editor-light",
  },
  {
    name: "Kimbie Dark",
    value: "kimbie-dark",
  },
  {
    name: "Kimbie Light",
    value: "kimbie-light",
  },
  {
    name: "Lightfair",
    value: "lightfair",
  },
  {
    name: "Lioshi",
    value: "lioshi",
  },
  {
    name: "Magula",
    value: "magula",
  },
  {
    name: "Mono Blue",
    value: "mono-blue",
  },
  {
    name: "Monokai",
    value: "monokai",
  },
  {
    name: "Monokai Sublime",
    value: "monokai-sublime",
  },
  {
    name: "Night Owl",
    value: "night-owl",
  },
  {
    name: "Nnfx Dark",
    value: "nnfx-dark",
  },
  {
    name: "Nnfx Light",
    value: "nnfx-light",
  },
  {
    name: "Nord",
    value: "nord",
  },
  {
    name: "Obsidian",
    value: "obsidian",
  },
  {
    name: "Paraiso Dark",
    value: "paraiso-dark",
  },
  {
    name: "Paraiso Light",
    value: "paraiso-light",
  },
  {
    name: "Pojoaque",
    value: "pojoaque",
  },
  {
    name: "Purebasic",
    value: "purebasic",
  },
  {
    name: "Qtcreator Dark",
    value: "qtcreator-dark",
  },
  {
    name: "Qtcreator Light",
    value: "qtcreator-light",
  },
  {
    name: "Rainbow",
    value: "rainbow",
  },
  {
    name: "Routeros",
    value: "routeros",
  },
  {
    name: "School Book",
    value: "school-book",
  },
  {
    name: "Shades of Purple",
    value: "shades-of-purple",
  },
  {
    name: "Srcery",
    value: "srcery",
  },
  {
    name: "Stackoverflow Dark",
    value: "stackoverflow-dark",
  },
  {
    name: "Stackoverflow Light",
    value: "stackoverflow-light",
  },
  {
    name: "Sunburst",
    value: "sunburst",
  },
  {
    name: "Tokyo Night Dark",
    value: "tokyo-night-dark",
  },
  {
    name: "Tokyo Night Light",
    value: "tokyo-night-light",
  },
  {
    name: "Tomorrow Night Blue",
    value: "tomorrow-night-blue",
  },
  {
    name: "Tomorrow Night Bright",
    value: "tomorrow-night-bright",
  },
  {
    name: "Vs",
    value: "vs",
  },
  {
    name: "Vs 2015",
    value: "vs2015",
  },
  {
    name: "Xcode",
    value: "xcode",
  },
  {
    name: "Xt 256",
    value: "xt256",
  },
];

const MARKDOWN_TEXT = `#ЗагрузитьИзФайла ext_module.txt // директива 7.7
#Если Клиент ИЛИ НаКлиенте Тогда // инструкции препроцессора
	&НаКлиентеНаСервереБезКонтекста // директивы компиляции
	Функция ТолстыйКлиентОбычноеПриложение(Знач Параметр1 = Неопределено, // комментарий
		Параметр2 = "", ПараметрN = 123.45, ПарамNN) Экспорт // еще комментарий
		Попытка
			Результат_Булевы_Значения = Новый Структура("П1, П2", Истина, Ложь, NULL, Неопределено);
			Перейти ~МеткаGOTO; // комментарий
			РезультатТаблицаДат = Новый ТаблицаЗначений;
			РезультатТаблицаДат.Колонки.Добавить("Колонка1", 
			Новый ОписаниеТипов("Дата", , ,
			Новый КвалификаторыДаты(ЧастиДаты.ДатаВремя));
			НС = РезультатТаблицаДат.Добавить(); НС["Колонка1"] = '20170101120000');
		Исключение
			ОписаниеОшибки = ОписаниеОшибки(); // встроенная функция
			Масс = Новый Массив; // встроенный тип
			Для Каждого Значение Из Масс Цикл
				Сообщить(Значение + Символы.ПС + "
				|продолжение строки"); // продолжение многострочной строки
				Продолжить; Прервать;
			КонецЦикла;
			СправочникСсылка   = Справочники.Языки.НайтиПоНаименованию("ru"); // встроенные типы
			СправочникОбъект   = СправочникСсылка.ПолучитьОбъект();
			ПеречислениеСсылка = Перечисления.ВидыМодификацииДанных.Изменен;
			ВызватьИсключение ОписаниеОшибки;
		КонецПопытки;
		~МеткаGOTO: // еще комментарий
		ВД = ВидДвиженияБухгалтерии.Дебет;
	КонецФункции // ТолстыйКлиентОбычноеПриложение()
#КонецЕсли`;

const highlightCode = (code, language = "") => {
  // let code = "";
  // // if (url.includes(".js"))
  // code = await axios.get(url).then((response) => response.data);
  // console.log(code, typeof code, url);
  if (language === "") {
    return hljs.highlightAuto(code, languages).value;
  } else {
    return hljs.highlight(code, { language: language }).value;
  }
};

export default function CodeBlockPreview({ attachment }) {
  const [opened, setOpened] = useState(false);
  const [whiteSpace, setWhiteSpace] = useState("pre");
  const [highlight, setHighlight] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [referenceElementCode, setReferenceElementCode] = useState(null);
  const [referenceElementThemes, setReferenceElementThemes] = useState(null);
  const [visibleCode, setVisibleCode] = useState(false);
  const [visibleTheme, setVisibleTheme] = useState(false);
  // const codeRef = useClickOutside(() => setVisibleCode(false));
  // const themeRef = useClickOutside(() => setVisibleTheme(false));
  const [langs, setLangs] = useState(languages);
  const [themes, setThemes] = useState(codeThemes);
  const [valueCode, setValueCode] = useState("");
  const [valueThemes, setValueThemes] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(codeThemes[0].value);
  useEffect(async () => {
    // if (attachment.url.includes(".js")) {
    if (attachment) {
      const hl = await axios
        .get(attachment.url)
        .then((response) => response.data);
      setInputCode(hl);
    }
    // }
  }, [attachment]);
  useEffect(() => {
    if (inputCode) {
      setHighlight(highlightCode(inputCode, selectedLang));
    }
  }, [inputCode, selectedLang]);
  useEffect(() => {
    require(`./${selectedTheme}.css`);
  }, [selectedTheme]);
  useEffect(() => {
    const langsClone = languages.filter((lang) =>
      lang.toLowerCase().includes(valueCode.toLowerCase())
    );
    setLangs(langsClone);
  }, [valueCode]);
  useEffect(() => {
    const themesClone = codeThemes.filter((theme) =>
      theme.name.toLowerCase().includes(valueThemes.toLowerCase())
    );
    setThemes(themesClone);
  }, [valueThemes]);
  return (
    <div className="flex flex-col bg-slate-300 rounded-md overflow-hidden p-3 gap-2 relative max-w-2xl">
      <div className="absolute right-6 top-6">
        <ActionIcon>
          <FontAwesomeIcon icon="fa-solid fa-copy" />
        </ActionIcon>
      </div>
      <div className="h-36 overflow-auto rounded-md hljs">
        <pre>
          <code
            className="hljs"
            style={{ whiteSpace: whiteSpace }}
            dangerouslySetInnerHTML={{ __html: highlight }}
          ></code>
        </pre>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Image width="auto" height={36} src={IconOther} />
          <div className="flex flex-col">
            <div className="font-semibold">{attachment.filename}</div>
            <div className="text-xs">{attachment.size}KB</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {/* <TextInput /> */}
          <Select
            className="sticky top-0 z-50"
            value={whiteSpace}
            onChange={setWhiteSpace}
            data={[
              { value: "pre", label: "Unwrapped" },
              { value: "pre-wrap", label: "Line wrap" },
              { value: "pre-line", label: "Line" },
              { value: "unset", label: "Minify" },
            ]}
          />
          <ActionIcon onClick={() => setOpened(true)}>
            <FontAwesomeIcon icon="fa-solid fa-eye" />
          </ActionIcon>
          <ActionIcon
            ref={setReferenceElementCode}
            onClick={() => setVisibleCode((m) => !m)}
          >
            <FontAwesomeIcon icon="fa-solid fa-code" />
          </ActionIcon>
          <Popper
            // ref={codeRef}
            arrowSize={5}
            withArrow
            mounted={visibleCode}
            referenceElement={referenceElementCode}
            transition="pop-top-left"
            transitionDuration={200}
            arrowStyle={{
              pointerEvents: "all",
            }}
            width={300}
          >
            <Paper
              shadow="xs"
              p="xs"
              withBorder
              style={{
                pointerEvents: "all",
              }}
            >
              <TextInput
                placeholder="Search languages"
                className="mb-2"
                value={valueCode}
                onChange={(e) => setValueCode(e.target.value)}
              />
              <ScrollArea style={{ height: 200 }} offsetScrollbars>
                <div className="flex flex-col gap-1 text-sm">
                  {langs.map((language) => (
                    <div
                      key={language}
                      onClick={() => {
                        setSelectedLang(language);
                      }}
                      className={`font-medium rounded p-2 cursor-pointer flex items-center hover:bg-slate-100 ${
                        selectedLang === language ? "bg-slate-100" : ""
                      }`}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Paper>
          </Popper>
          <ActionIcon
            ref={setReferenceElementThemes}
            onClick={() => setVisibleTheme((m) => !m)}
          >
            <FontAwesomeIcon icon="fa-solid fa-palette" />
          </ActionIcon>
          <Popper
            // ref={themeRef}
            arrowSize={5}
            withArrow
            mounted={visibleTheme}
            referenceElement={referenceElementThemes}
            transition="pop-top-left"
            transitionDuration={200}
            arrowStyle={{
              pointerEvents: "all",
            }}
            width={300}
          >
            <Paper
              shadow="xs"
              p="xs"
              withBorder
              style={{
                pointerEvents: "all",
              }}
            >
              <TextInput
                placeholder="Search themes"
                className="mb-2"
                value={valueThemes}
                onChange={(e) => setValueThemes(e.target.value)}
              />
              <ScrollArea
                style={{ height: 200 }}
                scrollbarSize={8}
                offsetScrollbars
              >
                <div className="flex flex-col gap-1 text-sm">
                  {themes.map((theme) => (
                    <div
                      key={theme.value}
                      onClick={() => {
                        setSelectedTheme(theme.value);
                      }}
                      className={`font-medium rounded p-2 cursor-pointer flex items-center hover:bg-slate-100 ${
                        theme.value === selectedTheme ? "bg-slate-100" : ""
                      }`}
                    >
                      {theme.name}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Paper>
          </Popper>
          <ActionIcon>
            <FontAwesomeIcon icon="fa-solid fa-file-arrow-down" />
          </ActionIcon>
        </div>
      </div>
      <Modal
        size="full"
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Preview Code`}
        zIndex="100"
      >
        <Select
          className="sticky top-0 bg-white z-50"
          value={whiteSpace}
          onChange={setWhiteSpace}
          data={[
            { value: "pre", label: "Unwrapped" },
            { value: "pre-wrap", label: "Line wrap" },
            { value: "pre-line", label: "Line" },
            { value: "unset", label: "Minify" },
          ]}
        />
        <div className="overflow-auto rounded-md hljs mt-2">
          <pre style={{ whiteSpace }}>
            <code
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: highlight,
              }}
            ></code>
          </pre>
        </div>
      </Modal>
    </div>
  );
}
