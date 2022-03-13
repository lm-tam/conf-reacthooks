import ImageToggleOnScroll from './ImageToggleOnScroll';
import React, {useContext} from 'react';
import {GlobalContext} from './GlobalState';
import {FavoriteClickCountContext} from './FavoriteClickCountContext';

const SpeakerDetail = React.memo(({
  speakerRec,
  onHeartFavoriteHandler,
}) => {
    const { id, firstName, lastName, favorite, bio } = speakerRec
    const { incrementFavoriteClickCount } = useContext(FavoriteClickCountContext)

    console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
    return (
        <div className="card col-4 cardmin">
          <ImageToggleOnScroll
            className="card-img-top"
            primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
            secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
            alt="{firstName} {lastName}"
          />
          <div className="card-body">
            <h4 className="card-title">
              <button
                data-sessionid={id}
                className={favorite ? 'heartredbutton' : 'heartdarkbutton'}
                onClick={(e) => {
                  onHeartFavoriteHandler(e, speakerRec);
                  incrementFavoriteClickCount()
                }}
              />
              <span>
                {firstName} {lastName}
              </span>
            </h4>
            <span>{bio}</span>
          </div>
        </div>
    );
})

export default SpeakerDetail;
