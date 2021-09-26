import { GetStaticProps } from "next";
import "./about.module.css";

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: "Ying Cong",
    },
  };
};

export function About(props: AboutProps) {
  return (
    <div>
      <h1>Welcome, {props.name}!</h1>
    </div>
  );
}

export default About;
