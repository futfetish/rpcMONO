import { FC } from "react";
import Image from "next/image";
import Styles from "./gameButtons.module.scss";
import classNames from "classnames";

const ROCK_IMAGE_URL =
  "https://brendan-fisher.github.io/rock_paper_scissors/images/rock.png";
const PAPER_IMAGE_URL =
  "https://brendan-fisher.github.io/rock_paper_scissors/images/paper.png";
const SCISSORS_IMAGE_URL =
  "https://brendan-fisher.github.io/rock_paper_scissors/images/scissors.png";

const ImageContainer: FC<{ src: string , active : boolean }> = ({ src , active}) => {
  return (
    <div className={classNames( Styles.imageContainer__box , active ? Styles.imageContainer__active : '')}>
      <img src={src} alt="" />
    </div>
  );
};

interface buttonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const buttonBulder = (src: string) : FC<buttonProps & Record<string, any>> => {
  const MyButton = ({
    onClick,
    active = false,
    ...props
  }: buttonProps & Record<string, any>) => {
    return (
      <button
        className={classNames(Styles.but , active ? Styles.but__active : '')}
        {...props}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <ImageContainer active={active} src={src} />
      </button>
    );
  };
  return MyButton;
};

export const ScissorsButton = buttonBulder(SCISSORS_IMAGE_URL);
export const ScissorsBox:FC<{active : boolean}> = ({active }) => <ImageContainer src={SCISSORS_IMAGE_URL} active={active} />

export const RockButton = buttonBulder(ROCK_IMAGE_URL);
export const RockBox:FC<{active : boolean}> = ({active }) => <ImageContainer src={ROCK_IMAGE_URL} active={active} />

export const PaperButton = buttonBulder(PAPER_IMAGE_URL);
export const PaperBox:FC<{active : boolean}> = ({active }) => <ImageContainer src={PAPER_IMAGE_URL} active={active} />
