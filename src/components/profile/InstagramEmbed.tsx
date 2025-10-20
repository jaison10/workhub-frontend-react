import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

interface InstagramEmbedProps {
  username: string;
}

/**
 * InstagramEmbed Component
 *
 * Displays Instagram profile embedded using iframe
 *
 * @param username - Instagram username (without @ symbol)
 */
export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ username }) => {
  // Clean username (remove @ if present)
  const cleanUsername = username.replace('@', '');
  const instagramUrl = `https://www.instagram.com/${cleanUsername}`;
  const embedUrl = `https://www.instagram.com/${cleanUsername}/embed`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Instagram size={20} className="text-pink-600" />
          <h2 className="text-xl font-bold text-gray-900">Instagram</h2>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View Full Profile</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Instagram Profile Card */}
      <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Instagram size={28} className="text-gray-700" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">@{cleanUsername}</h3>
            <p className="text-sm text-gray-600">Instagram Profile</p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-sm"
          >
            Follow
          </a>
        </div>
      </div>

      {/* Instagram Embedded Content */}
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <iframe
          src={embedUrl}
          className="w-full border-0"
          style={{ minHeight: '600px', maxHeight: '800px' }}
          scrolling="no"
          frameBorder="0"
          allowTransparency={true}
          title={`Instagram profile of ${cleanUsername}`}
        />

        {/* Fallback overlay if iframe doesn't load */}
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300" id="instagram-fallback">
          <div className="text-center p-8">
            <Instagram size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Unable to load Instagram embed</p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all pointer-events-auto"
            >
              <Instagram size={16} />
              Visit on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> Instagram content is embedded directly from Instagram. Some profiles may restrict embedding or require you to be logged in to Instagram to view.
        </p>
      </div>
    </div>
  );
};
