"use client";
import { actionFunction } from "@/utils/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

type imageInputContainerProps = {
  name: string;
  text: string;
  image: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function ImageContainer(props: imageInputContainerProps) {
  const { name, text, action, image } = props;
  const [isUpdatedFormVisible, setIsUpdatedFormVisible] = useState(false);

  return (
    <div>
      {/* two parts -> display the image and give a button that allows them to updated and secondly a form that updates the image */}

      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="object-cover rounded h-[200px] w-[200px] "
        priority
      />

      <Button
        type="submit"
        onClick={() => setIsUpdatedFormVisible((prev) => !prev)}
        className="mt-4 capitalize"
      >
        {text}
      </Button>

      {isUpdatedFormVisible && (
        <div className="max-w-md mt-6">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton text={text} size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
  return <div>ImageContainer</div>;
}

export default ImageContainer;
