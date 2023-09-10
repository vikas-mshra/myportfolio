import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a
          href="https://github.com/vikas-mshra"
          rel="noreferrer"
          target="_blank"
        >
          <FaGithub />
        </a>
      </div>
      <div>
        <a
          href="https://twitter.com/vikas_mshra"
          rel="noreferrer"
          target="_blank"
        >
          <FaXTwitter />
        </a>
      </div>
      <div>
        <a
          href="https://www.facebook.com/vv19986/"
          rel="noreferrer"
          target="_blank"
        >
          <FaFacebookF />
        </a>
      </div>
      <div>
        <a
          href="https://www.instagram.com/vikas_mshra/"
          rel="noreferrer"
          target="_blank"
        >
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
