export interface SharedLayoutProps {
  children: React.ReactElement;
  title: string;
  leftSidebar?: boolean;
  rightSidebar?: boolean;
  topBar?: boolean;
  bottomBar?: boolean;
}
