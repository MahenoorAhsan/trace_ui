import React, { useState } from 'react'
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import EmotionsCard from './components/Emotions/EmotionsCard';
import WatermarkCard from './components/Watermark/WatermarkCard';
export default function Main() {
    const [isAnalysing, setIsAnalysing] = useState(false);
    const changeIsAnalysing = () => {
        setIsAnalysing(true);
    }
    return (
        <div className="d-flex flex-column flex-column-fluid">
          <div className="container position-relative">
            {
                !isAnalysing ?
                <DragAndDrop setAnalysing={changeIsAnalysing}/>
            :
             <div className="row">
              <div className="col-md-4">
                <WatermarkCard />
              </div>
              <div className="col-md-8">
                <EmotionsCard />
              </div>
            </div> 
            }
          </div>
        </div>
      );
}
