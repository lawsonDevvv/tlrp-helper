export default function suffix(n: number): string | void {
  if (n.toString().endsWith("0")) {
    return "th";
  }

  if (n.toString().endsWith("1") && n.toString().length > 1) {
    return "st";
  }

  if (n.toString().endsWith("1") && n.toString().length === 1) {
    return "st";
  }

  if (n.toString().endsWith("2")) {
    return "nd";
  }

  if (n.toString().endsWith("3")) {
    return "rd";
  }

  if (n.toString().endsWith("4")) {
    return "th";
  }

  if (n.toString().endsWith("5")) {
    return "th";
  }

  if (n.toString().endsWith("6")) {
    return "th";
  }

  if (n.toString().endsWith("7")) {
    return "th";
  }

  if (n.toString().endsWith("8")) {
    return "th";
  }

  if (n.toString().endsWith("9")) {
    return "th";
  }
}
