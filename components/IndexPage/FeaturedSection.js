import {
  BookmarkIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  SearchIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Anytime, Anywhere",
    description: "Access your photos on a phone, laptop, or tablet!",
    icon: GlobeAltIcon,
  },
  {
    name: "Auto-suggested Tags",
    description:
      "Powered by artificial intelligence and Clarifai, Clear Closet automatically suggests accurate and descriptive tags for your images.",
    icon: BookmarkIcon,
  },
  {
    name: "Instant Upload",
    description: "idk",
    icon: LightningBoltIcon,
  },
  {
    name: "Simple Search",
    description:
      "Simply enter the tags you're searching for into the search bar, and easily view the photos that best match your search.",
    icon: SearchIcon,
  },
];

export default function Example() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            about clear closet
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to manage your photos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
