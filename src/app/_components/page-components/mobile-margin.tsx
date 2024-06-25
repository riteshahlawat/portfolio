/**
 * Due to sticky header not working well with margin and paddings, I add a
 * div instead for mobile.
 */
export default function MobileMargin() {
  return <div className="block h-16 md:hidden" />;
}
