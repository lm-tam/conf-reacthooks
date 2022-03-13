import React, {useEffect, useState, useContext, useReducer, useCallback, useMemo} from 'react';
import { Header } from '../src/Header';
import { Menu } from '../src/Menu';
import SpeakerDetail from './SpeakerDetail';
import { ConfigContext } from './App'
import speakersReducer from './speakerReducer';
import speakerData from './SpeakerData';
import useSpeakerDataManager from './useSpeakerDataManager';
import {GlobalContext} from './GlobalState';

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true)

  const [speakingSunday, setSpeakingSunday] = useState(true)

  const context= useContext(ConfigContext)

  const { speakerList, isLoading, toggleSpeakerFavorite, hasError, error, forceImageRerender }= useContext(GlobalContext)

  // const { speakerList, isLoading, toggleSpeakerFavorite } = useSpeakerDataManager()


  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
    forceImageRerender()
  };

  const newSpeakerList = useMemo(() => speakerList
      .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
      )
      .sort(function (a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      }), [speakerList, speakingSaturday, speakingSunday])

  const speakerListFiltered = isLoading
    ? []
    : newSpeakerList;

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
    forceImageRerender()
  };

  const heartFavoriteHandler = useCallback((e, speakerRec) => {
    e.preventDefault();
    toggleSpeakerFavorite(speakerRec)
  }, [])

  if (hasError) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays && (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              (speakerRec) => {
                return (
                  <SpeakerDetail
                      key={speakerRec.id}
                    id={speakerRec.id}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    speakerRec={speakerRec}
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
