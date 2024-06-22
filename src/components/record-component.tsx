import Image from 'next/image';
import Link from 'next/link';

type RecordProps = {
  id: number;
  coverImage: string;
  artist: string;
  title: string;
  year: number;
  styles: string;
  masterUrl: string;
  resourceUrl: string;
  genres: string;
  formats: string;
};

const RecordComponent: React.FC<RecordProps> = ({
  id,
  coverImage,
  artist,
  title,
  year,
  styles,
  masterUrl,
  resourceUrl,
  genres,
  formats,
}) => (
  <div key={id} className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
    <div className="flex flex-col w-full">
      <div className="relative w-full flex-grow">
        <Link href={`/record/${id}`}>
            <Image
              src={`${coverImage || '/placeholder.svg'}`}
              alt={artist}
              width={640}
              height={640}
              className="object-contain rounded-sm"
              priority
            />
        </Link>
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold">{artist}</h3>
        <h3 className="text-lg font-semibold">{id}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{year}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{styles}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{masterUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{resourceUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{genres}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{formats}</p>
      </div>
    </div>
  </div>
);

export default RecordComponent;
