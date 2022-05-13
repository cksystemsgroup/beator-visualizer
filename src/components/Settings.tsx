function Settings({
  autoExpand,
  setAutoExpand,
}: {
  autoExpand: boolean;
  setAutoExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <details className="settings">
      <summary>Settings</summary>
      <label>
        <input
          checked={autoExpand}
          type="checkbox"
          onChange={() => setAutoExpand((x) => !x)}
        />
        Auto Expand
      </label>
    </details>
  );
}

export default Settings;
