import Image from 'next/image';
import Link from 'next/link';

interface Artist {
  id: number;
  name: string;
  resourceUrl: string;
}

interface RecordProps {
  id: number;
  coverImage: string;
  artist: Artist;
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
        <Link href={`/record/${artist.id}`}>
            <Image
              src={`${coverImage || '/placeholder.svg'}`}
              alt={artist.name}
              width={640}
              height={640}
              className="object-contain rounded-sm"
              priority
            />
        </Link>
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold">Name: {artist.name} {id}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Id: {artist.id}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Resource URL: {artist.resourceUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Title: {title}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Year: {year}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Styles: {styles}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Master URL: {masterUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Resource URL: {resourceUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Genres: {genres}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Formats: {formats}</p>
      </div>
    </div>
  </div>
);

export default RecordComponent;
