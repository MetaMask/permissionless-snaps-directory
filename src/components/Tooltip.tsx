export const Tooltip = ({
  visible,
  position,
  content,
}: {
  visible: boolean;
  position: { x: number; y: number };
  content: any;
}) => {
  if (!visible) {
    return null;
  }

  const style: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    background: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '4px',
    color: '#fff',
    padding: '5px 10px',
    fontSize: '12px',
    pointerEvents: 'none' as const,
  };

  return <div style={style}>{content}</div>;
};
