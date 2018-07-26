import system from "system-components";

const CardWrapper = system({
  display: "block",
  width: ["18rem", "18rem", "18rem"],
  bg: "grayScale.0"
}).extend`

  &:hover {
    section:last-child {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  section {
    &:last-child {
      border-bottom: ${({ theme }) => theme.borders[2]};
      border-color: ${({ theme }) => theme.colors.grayScale[2]};
    }
  }
}
`;

export default CardWrapper;
