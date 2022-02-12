import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { BaseTemplate } from '../modules/template';
import { Paths } from './constants';
import { Homepage } from '../modules/homepage';
import MiniGameAudioCall from '../modules/audiocall';
import { MiniGameSprint } from '../modules/mg-sprint';
import { NotFoundPage } from '../modules/404';
import { Textbook } from '../modules/textbook';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.home} element={<BaseTemplate />}>
          <Route index element={<Homepage />} />
          <Route path={Paths.textBook} element={<Textbook />} />
          <Route path={Paths.mgAudioCall} element={<MiniGameAudioCall />} />
          <Route path={Paths.mgSprint} element={<MiniGameSprint />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
