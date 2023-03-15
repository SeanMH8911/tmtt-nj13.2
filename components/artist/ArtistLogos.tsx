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
    const linkEnd = i.split("com");
    return linkEnd[1];
  }
  function formatWebsiteLink(i: string) {
    const linkStart = i.split("www.");
    return linkStart[1];
  }
  return (
    <>
      {facebook && (
        <a
          target={"blank"}
          href={`https://www.facebook.com${formatLink(facebook)}`}
        >
          <FaFacebookSquare fill="#3b5998" size={24} />
        </a>
      )}

      {instagram && (
        <a href={`https://www.instagram.com${formatLink(instagram)}`}>
          <FaInstagram fill="#fa7e1e" size={24} />
        </a>
      )}

      {youtube && (
        <a href={`https://www.youtube.com${formatLink(youtube)}`}>
          <FaYoutube fill="#FF0000" size={24} />
        </a>
      )}

      {website && (
        <a href={`https://www.${formatWebsiteLink(website)}`}>
          <TbWorldWww size={24} />
        </a>
      )}
    </>
  );
}
