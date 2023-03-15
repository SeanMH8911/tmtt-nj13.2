import { FaFacebookSquare, FaYoutube, FaInstagram } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

type Props = {
  facebook: string;
  instagram: string;
  youtube: string;
  website: string;
};

export default function ArtistLogos({
  facebook,
  instagram,
  youtube,
  website,
}: Props) {
  function formatLink(i: string) {
    const LinkEnd = i.split("com");
    return LinkEnd[1];
  }

  return (
    <>
      {facebook && (
        <a
          target={"blank"}
          href={`https://www.facebook.com${formatLink(facebook)}`}
        >
          <FaFacebookSquare fill="#3b5998" size={20} />
        </a>
      )}

      {instagram && (
        <a href={`${instagram}`}>
          <FaInstagram fill="#fa7e1e" size={20} />
        </a>
      )}

      {youtube && (
        <a href={`${youtube}`}>
          <FaYoutube fill="#FF0000" size={20} />
        </a>
      )}

      {website && (
        <a href={`${website}`}>
          <TbWorldWww size={20} />
        </a>
      )}
    </>
  );
}
