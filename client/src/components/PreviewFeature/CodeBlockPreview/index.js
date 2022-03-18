import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
import { ActionIcon, Select, Spoiler } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modals/Modal";

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

const highlightCode = (code) => {
  return hljs.highlightAuto(code, [
    "1C",
    "ABNF",
    "Access logs",
    "Ada",
    "Arduino (C++ w/Arduino libs)",
    "Arduino (C++ w/Arduino libs)",
    "AVR assembler",
    "ActionScript",
    "AngelScript",
    "Apache",
    "AppleScript",
    "Arcade",
    "AsciiDoc",
    "AspectJ",
    "AutoHotkey",
    "AutoIt",
    "Awk",
    "Bash",
    "Basic",
    "BNF",
    "Brainfuck",
    "C#",
    "C",
    "C++",
    "C/AL",
    "Cache Object Script",
    "CMake",
    "Coq",
    "CSP",
    "CSS",
    "Cap'n Proto",
    // "Chapel",
    // "Chaos",
    // "Cisco CLI",
    "Clojure",
    "CoffeeScript",
    // "CpcdosC+",
    "Crmsh",
    "Crystal",
    // "cURL",
    // "Cypher (Neo4j)",
    "D",
    // "Dafny",
    "Dart",
    "Delphi",
    "Diff",
    "Django",
    "DNS Zone file",
    "Dockerfile",
    "DOS",
    "dsconfig",
    "DTS (Device Tree)",
    "Dust",
    "EBNF",
    "Elixir",
    "Elm",
    "Erlang",
    "Excel",
    "F#",
    "FIX",
    "Fortran",
    "G-Code",
    "Gams",
    "GAUSS",
    "Gherkin",
    "Go",
    "Golo",
    "Gradle",
    "Golo",
    "Gradle",
    "GraphQL",
    "Groovy",
    "HTML, XML",
    "HTTP",
    "Haml",
    "Handlebars",
    "Haskell",
    "Haxe",
    "Hy",
    "Ini,TOML",
    "Inform7",
    "IRPF90",
    "JSON",
    "Java",
    "JavaScript",
    "Julia",
    "Kotlin",
    "LaTeX",
    "Leaf",
    "Lasso",
    "Less",
    "LDIF",
    "Lisp",
    "LiveCode Server",
    "LiveScript",
    "Lua",
    "Makefile",
    "Markdown",
    "Mathematica",
    "Matlab",
    "Maxima",
    "Mercury",
    "Maya Embedded Language",
    "Mizar",
    "Mojolicious",
    "Monkey",
    "MoonScript",
    "N1QL",
    "NSIS",
    "Nginx",
    "Nim",
    "Nix",
    "OCaml",
    "Objective C",
    "OpenGL Shading Language",
    "OpenSCAD",
    "Oracle Rules Language",
    "Oxygene",
    "PF",
    "PHP",
    "Parser3",
    "Perl",
    "Plain Text",
    "Pony",
    "PostgreSQL & PL/pgSQL",
    "PowerShell",
    "Processing",
    "Prolog",
    "Properties",
    "Protocol Buffers",
    "Puppet",
    "Python",
    "Python profiler results",
    "Python REPL",
    "Q",
    "QML",
    "R",
    "ReasonML",
    "RenderMan RIB",
    "RenderMan RSL",
    "Roboconf",
    "Ruby",
    "Rust",
    "SAS",
    "SCSS",
    "SQL",
    "STEP Part 21",
    "Scala",
    "Scheme",
    "Scilab",
    "Shell",
    "Smali",
    "Smalltalk",
    "SML",
    "Stan",
    "Stata",
    "Stylus",
    "SubUnit",
    "Swift",
    "Tcl",
    "Test Anything Protocol",
    "Thrift",
    "TP",
    "Twig",
    "TypeScript",
    "VB.Net",
    "VBScript",
    "VHDL",
    "Vala",
    "Verilog",
    "Vim Script",
    "X++",
    "x86 Assembly",
    "XL",
    "XQuery",
    "YAML",
    "Zephir",
  ]).value;
};

export default function CodeBlockPreview() {
  const [opened, setOpened] = useState(false);
  const [whiteSpace, setWhiteSpace] = useState("pre");
  useEffect(() => {
    require("highlight.js/styles/base16/3024.css");
  }, []);
  return (
    <div className="flex flex-col bg-slate-300 rounded-md overflow-hidden p-3 gap-2 relative">
      <div className="absolute right-6 top-6">
        <ActionIcon>
          <FontAwesomeIcon icon="fa-solid fa-copy" />
        </ActionIcon>
      </div>
      <div className="h-36 overflow-auto rounded-md hljs">
        <pre>
          <code
            className="hljs"
            style={{ whiteSpace: "pre", overflowX: "auto" }}
            dangerouslySetInnerHTML={{ __html: highlightCode(MARKDOWN_TEXT) }}
          ></code>
        </pre>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div></div>
          <div className="flex flex-col">
            <div className="font-semibold">ChatActivity.java</div>
            <div className="text-xs">13.24KB</div>
          </div>
        </div>
        <div className="flex gap-2">
          <ActionIcon onClick={() => setOpened(true)}>
            <FontAwesomeIcon icon="fa-solid fa-eye" />
          </ActionIcon>
          <ActionIcon>
            <FontAwesomeIcon icon="fa-solid fa-code" />
          </ActionIcon>
          <ActionIcon>
            <FontAwesomeIcon icon="fa-solid fa-palette" />
          </ActionIcon>
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
        <div className="overflow-auto rounded-md hljs">
          <pre style={{ whiteSpace }}>
            <code
              className="hljs"
              dangerouslySetInnerHTML={{
                __html: highlightCode(MARKDOWN_TEXT),
              }}
            ></code>
          </pre>
        </div>
      </Modal>
    </div>
  );
}
