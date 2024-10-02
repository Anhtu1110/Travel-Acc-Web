type AdvertisementBannerProps = {
    imageUrl: string;
    title: string;
    description: string;
    link: string;
  };
  
  const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
    imageUrl,
    title,
    description,
    link,
  }) => {
    return (
      <div className="relative group"> {/* Add group to the parent div */}
        {/* Banner Image */}
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
  
        {/* Hidden content that appears on hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-2">{description}</p>
          <a href={link} className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Learn More
          </a>
        </div>
      </div>
    );
  };
  
  export default AdvertisementBanner;
  