export const LangWrapper = ({ Component }: { Component: React.ComponentType }) => {
  // Language detection is now handled by useLanguageSwitcher in TranslationProvider
  // This component only handles hash-based URL cleanup if needed
  
  return <Component />;
};
