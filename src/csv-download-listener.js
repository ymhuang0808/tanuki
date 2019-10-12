export default function(delta) {
  if (delta.state && delta.state.current === 'complete') {
    URL.revokeObjectURL(delta.url);
  }
}
