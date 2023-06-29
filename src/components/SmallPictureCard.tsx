type Props = {
  url: string;
  productName: string;
};

const SmallPictureCard = ({ url, productName }: Props) => {
  return <img src={url} alt={productName} />;
};

export default SmallPictureCard;
