import * as React from "react";
import { Button } from "./Button";
import styles from "./Form.module.css";

type IFormProps = {
  "onSubmit": (payload: { title: string; description: string; price: string }) => void;
}

export const Form: React.FC<IFormProps> = (props) => {
  let formRef = React.useRef<HTMLFormElement>(null);
  let titleRef = React.useRef<HTMLInputElement>(null);
  let priceRef = React.useRef<HTMLInputElement>(null);
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert("Your product needs a title");

      return;
    }

    if (!descriptionRef.current?.value || !priceRef.current?.value) {
      alert("Your product needs some content");

      return;
    }

    if (isNaN(+priceRef.current?.value)) {
      alert("Price should be numeric only");

      return;
    }

    
    if (titleRef.current?.value.length > 50) {
      alert("Title length should be less than 50.");
      return;
    }

    
    if (descriptionRef.current?.value.length > 100) {
      alert("Description length should be less than 100.");
      return;
    }

    props["onSubmit"]({
      title: titleRef.current && titleRef.current.value,
      description: descriptionRef.current && descriptionRef.current.value,
      price: priceRef.current && priceRef.current.value,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceRef}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
