type Props = {
  url: string;
  productName: string;
};

const ImageCard = ({ url, productName }: Props) => {
  return <img src={url} alt={productName} />;
};

export default ImageCard;
