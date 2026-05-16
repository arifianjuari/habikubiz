import { Theme } from './settings/types';
import { HabikuBizLandingPageWireframe } from './components/generated/HabikuBizLandingPageWireframe';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <HabikuBizLandingPageWireframe />
    </>);
  // %EXPORT_STATEMENT%
}

export default App;