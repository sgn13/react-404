import React, { useEffect } from "react";
import styled from "styled-components";

const text = `In publishing and graphic design, Lorem ipsum is a placeholder text
commonly used to demonstrate the visual form of a document or a
typeface without relying on meaningful content. Lorem ipsum may be
used as a placeholder before final copy is available. It is also used
to temporarily replace text in a process called greeking, which allows
designers to consider the form of a webpage or publication, without
the meaning of the text influencing the design. Lorem ipsum is
typically a corrupted version of De finibus bonorum et malorum, a
1st-century BC text by the Roman statesman and philosopher Cicero,
with words altered, added, and removed to make it nonsensical and
improper Latin. Versions of the Lorem ipsum text have been used in
typesetting at least since the 1960s, when it was popularized by
advertisements for Letraset transfer sheets.[1] Lorem ipsum was
introduced to the digital world in the mid-1980s, when Aldus employed
it in graphic and word-processing templates for its desktop publishing
program PageMaker. Other popular word processors, including Pages and
Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX
packages,[3][4][5] web content managers such as Joomla! and WordPress,
and CSS libraries such as Semantic UI.[6] In publishing and graphic
design, Lorem ipsum is a placeholder text commonly used to demonstrate
the visual form of a document or a typeface without relying on
meaningful content. Lorem ipsum may be used as a placeholder before
final copy is available. It is also used to temporarily replace text
in a process called greeking, which allows designers to consider the
form of a webpage or publication, without the meaning of the text
influencing the design. Lorem ipsum is typically a corrupted version
of De finibus bonorum et malorum, a 1st-century BC text by the Roman
statesman and philosopher Cicero, with words altered, added, and
removed to make it nonsensical and improper Latin. Versions of the
Lorem ipsum text have been used in typesetting at least since the
1960s, when it was popularized by advertisements for Letraset transfer
sheets.[1] Lorem ipsum was introduced to the digital world in the
mid-1980s, when Aldus employed it in graphic and word-processing
templates for its desktop publishing program PageMaker. Other popular
word processors, including Pages and Microsoft Word, have since
adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web
content managers such as Joomla! and WordPress, and CSS libraries such
as Semantic UI.[6] In publishing and graphic design, Lorem ipsum is a
placeholder text commonly used to demonstrate the visual form of a
document or a typeface without relying on meaningful content. Lorem
ipsum may be used as a placeholder before final copy is available. It
is also used to temporarily replace text in a process called greeking,
which allows designers to consider the form of a webpage or
publication, without the meaning of the text influencing the design.
Lorem ipsum is typically a corrupted version of De finibus bonorum et
malorum, a 1st-century BC text by the Roman statesman and philosopher
Cicero, with words altered, added, and removed to make it nonsensical
and improper Latin. Versions of the Lorem ipsum text have been used in
typesetting at least since the 1960s, when it was popularized by
advertisements for Letraset transfer sheets.[1] Lorem ipsum was
introduced to the digital world in the mid-1980s, when Aldus employed
it in graphic and word-processing templates for its desktop publishing
program PageMaker. Other popular word processors, including Pages and
Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX
packages,[3][4][5] web content managers such as Joomla! and WordPress,
and CSS libraries such as Semantic UI.[6]`;

const topAppBarHeight = 50;
const offsetHeightForContentUnderAppBar = topAppBarHeight;

const animation = {
  hide: `
	transform: translate(0, -${topAppBarHeight}px);
	transition: transform .5s;
      `,
  show: `
	transform: translate(0, 0);
	transition: transform .25s;
      `,
};

const Header = styled.header<{ show?: boolean; elevate?: boolean }>`
  min-height: ${topAppBarHeight}px;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  ${({ show = true }) => (show ? animation.show : animation.hide)}
  ${({ elevate = true }) =>
    elevate
      ? "box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;"
      : "box-shadow: none;"};
`;

const Paragraph = styled.p`
  margin: 0;
`;

function AppBar() {
  const [show, setShow] = React.useState(true);
  const [elevate, setElevate] = React.useState(false);

  useEffect(() => {
    const initialScrollPosition = 0;
    let previousScrollPosition = initialScrollPosition;

    const pageHeight = document.body.offsetHeight;
    const viewportHeight = window.innerHeight;

    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      // may executes when overshoots while scrolling up forcefully
      if (currentScrollPosition === initialScrollPosition) {
        setElevate(false);
        setShow(true);
        return;
      }

      // If the sum of window.scrollY and the viewport height exceeds the entire page height, then it means the scrolling-down page overshoots.
      if (currentScrollPosition < 0 || currentScrollPosition + viewportHeight > pageHeight) {
        setElevate(false);
        setShow(true);
        return;
      }

      const isScrollingDown = currentScrollPosition > previousScrollPosition;
      const isScrollingUp = !isScrollingDown;
      const isScrollerAppBarHeightAway = currentScrollPosition > topAppBarHeight;
      const shouldShow = !isScrollerAppBarHeightAway || isScrollingUp;
      const shouldElevate = isScrollingDown || (isScrollingUp && isScrollerAppBarHeightAway);

      if (shouldElevate !== elevate) setElevate(shouldElevate);
      if (show !== shouldShow) setShow(shouldShow);

      previousScrollPosition = currentScrollPosition;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Header show={show} elevate={elevate}>
        <div
          style={{
            height: "50px",
            backgroundColor: "teal",
          }}
        >
          Top App Bar
        </div>
      </Header>
      <div
        style={{
          minHeight: `${offsetHeightForContentUnderAppBar}px`,
        }}
      />
      <main>
        <Paragraph>
          {text}
          {text}
          {text}
        </Paragraph>
      </main>
    </div>
  );
}

export default AppBar;
