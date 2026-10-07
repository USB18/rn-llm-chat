import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Popup, { PopupAction } from './Popup';

export type { PopupAction };

export type PopupConfig = {
  title: string;
  message?: string;
  /** Defaults to a single "OK" button. */
  actions?: PopupAction[];
};

type PopupContextValue = {
  showPopup: (config: PopupConfig) => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

const DEFAULT_ACTIONS: PopupAction[] = [{ label: 'OK', primary: true }];

function PopupProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showPopup = useCallback((next: PopupConfig) => {
    setConfig(next);
    setVisible(true);
  }, []);

  // Keep the config while the fade-out runs so the text doesn't vanish mid-animation.
  const hidePopup = useCallback(() => setVisible(false), []);

  const value = useMemo(() => ({ showPopup }), [showPopup]);

  return (
    <PopupContext.Provider value={value}>
      {children}
      <Popup
        visible={visible}
        title={config?.title ?? ''}
        message={config?.message}
        actions={config?.actions ?? DEFAULT_ACTIONS}
        onClose={hidePopup}
      />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used inside <PopupProvider>');
  }
  return context;
}

export default PopupProvider;
