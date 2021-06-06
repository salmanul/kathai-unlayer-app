import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import { templateJson } from "../../test/template";
import * as Mustache from "mustache";

export const ReactEmailEditor = (props) => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      //   console.log('exportHtml', html);
      //   console.log('design', design);

      // Fill merge tags with some data after export
      const input = {
        first_name: "Salmanul",
        last_name: "Faris",
      };

      const htmlFilled = Mustache.render(html, input);  // mustache - string template builder
      console.log("Mustache", htmlFilled);
    });
  };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    emailEditorRef.current.editor.loadDesign(templateJson);
    // console.debug("onLoad", emailEditorRef.current);

    //Merge tags
    emailEditorRef.current.editor.setMergeTags({    // used to define mustache tags.
      first_name: {
        name: "First Name",
        value: "{{first_name}}",
        sample: "John",
      },
      last_name: {
        name: "Last Name",
        value: "{{last_name}}",
        sample: "Doe",
      },
    });
  };

  // set init options here
  const options = {
    appearance: {
      theme: "dark",
      panels: {
        tools: {
          dock: "left",
        },
      },
    },
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@acme.com",
    },
    // templateId: 49391, // use this to retrieve templates from dashboard
    // projectId: 22265,
    designTags: {   // use this to prefill any personalize data while creating the editor.
      business_name: "Tesla Inc",
      current_user_name: "Elon Musk",
    },
  };

  const tools = {};

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        options={options}
        tools={tools}
      />
    </div>
  );
};
