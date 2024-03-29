/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import sources, { foreignSources } from './sources';

import videojs from 'video.js';
import 'videojs-resolution-switcher';

import './App.css'
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
      player.updateSrc(
        // [{
      //   src: foreignSources[2].src,
      //   type: 'video/mp4',
      //   label: foreignSources[2].label,
      // }]
        sources
        //   [
        //   {
        //     src: sources[4].source_file,
        //     type: 'video/mp4',
        //     label: sources[4].name,
        //   }
        // ]
      )
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className='video-js vjs-big-play-centered' />
    </div>
  );
};

export default VideoJS;
