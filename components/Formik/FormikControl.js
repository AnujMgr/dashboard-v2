import React from "react";
import FormikInput from "./FormikInput";
import FormikSelect from "./FormikSelect";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <FormikInput {...rest} />;
    case "select":
      return <FormikSelect {...rest} />;
  }
}

export default FormikControl;
