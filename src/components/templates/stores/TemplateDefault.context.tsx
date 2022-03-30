import React from 'react'

interface IContexts {
  isOpen: boolean;
  toggleDrawer: () => void;
}
const TemplateDefaultContext = React.createContext<IContexts>({
  isOpen: true,
  toggleDrawer: () => {},
});

export const TemplateDefaultContextProvider: React.FC = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  const toggleDrawer = () => {setIsOpen(!isOpen)};

  const context: IContexts = {
    isOpen,
    toggleDrawer
  }
  return <TemplateDefaultContext.Provider value={context}>
    {props.children}
  </TemplateDefaultContext.Provider>
}

export default TemplateDefaultContext;