export const AVAILABLE_COLORS = [
  "red", "blue", "green", "yellow", "purple", "pink", "gray"]

export const getBGColor200 = (color: string): string => {
  color = color.toLowerCase();
  switch (color) {
    case "red":
      return "bg-red-200";
    case "blue":
      return "bg-blue-200";
    case "green":
      return "bg-green-200";
    case "yellow":
      return "bg-yellow-200";
    case "purple":
      return "bg-purple-200";
    case "pink":
      return "bg-pink-200";
    case "gray":
      return "bg-gray-200";
    default:
      return "bg-gray-200";
  }
};

export const getBGColor300 = (color: string): string => {
  switch (color) {
    case "red":
      return "bg-red-300";
    case "blue":
      return "bg-blue-300";
    case "green":
      return "bg-green-300";
    case "yellow":
      return "bg-yellow-300";
    case "purple":
      return "bg-purple-300";
    case "pink":
      return "bg-pink-300";
    case "gray":
      return "bg-gray-300";
    default:
      return "bg-gray-300";
  }
};



export const getBGColor400 = (color: string): string => {
  switch (color) {
    case "red":
      return "bg-red-400";
    case "blue":
      return "bg-blue-400";
    case "green":
      return "bg-green-400";
    case "yellow":
      return "bg-yellow-400";
    case "purple":
      return "bg-purple-400";
    case "pink":
      return "bg-pink-400";
    case "gray":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

export const getBGColorActive400 = (color: string): string => {
  switch (color) {
    case "red":
      return "active:bg-red-400";
    case "blue":
      return "active:bg-blue-400";
    case "green":
      return "active:bg-green-400";
    case "yellow":
      return "active:bg-yellow-400";
    case "purple":
      return "active:bg-purple-400";
    case "pink":
      return "active:bg-pink-400";
    case "gray":
      return "active:bg-gray-400";
    default:
      return "active:bg-gray-400";
  }
};

export const getTextColor200 = (color: string): string => {
  switch (color) {
    case "red":
      return "text-red-200";
    case "blue":
      return "text-blue-200";
    case "green":
      return "text-green-200";
    case "yellow":
      return "text-yellow-200";
    case "purple":
      return "text-purple-200";
    case "pink":
      return "text-pink-200";
    case "gray":
      return "text-gray-200";
    default:
      return "text-gray-200";
  }
};

export const getTextColor300 = (color: string): string => {
  switch (color) {
    case "red":
      return "text-red-300";
    case "blue":
      return "text-blue-300";
    case "green":
      return "text-green-300";
    case "yellow":
      return "text-yellow-300";
    case "purple":
      return "text-purple-300";
    case "pink":
      return "text-pink-300";
    case "gray":
      return "text-gray-300";
    default:
      return "text-gray-300";
  }
};

export const getFocusBorderColor200 = (color: string): string => {
  switch (color) {
    case "red":
    return  "focus:border-red-200";
    case "blue":
      return "focus:border-blue-200";
    case "green":
      return "focus:border-green-200";
    case "yellow":
      return "focus:border-yellow-200";
    case "purple":
      return "focus:border-purple-200";
    case "pink":
      return "focus:border-pink-200";
    case "gray":
      return "focus:border-gray-200";
      default:
      return "focus:border-gray-200";
  }
}


export const getFocusBorderColor300 = (color: string): string => {
  switch (color) {
    case "red":
    return  "focus:border-red-300";
    case "blue":
      return "focus:border-blue-300";
    case "green":
      return "focus:border-green-300";
    case "yellow":
      return "focus:border-yellow-300";
    case "purple":
      return "focus:border-purple-300";
    case "pink":
      return "focus:border-pink-300";
    case "gray":
      return "focus:border-gray-300";
      default:
      return "focus:border-gray-300";
  }
}
  
export const getBorderColor300 = (color: string): string => {
  switch (color) {
    case "red":
    return  "border-red-300";
    case "blue":
      return "border-blue-300";
    case "green":
      return "border-green-300";
    case "yellow":
      return "border-yellow-300";
    case "purple":
      return "border-purple-300";
    case "pink":
      return "border-pink-300";
    case "gray":
      return "border-gray-300";
      default:
      return "border-gray-300";
  }
}

export const getBorderColor200 = (color: string): string => {
  switch (color) {
    case "red":
    return  "border-red-200";
    case "blue":
      return "border-blue-200";
    case "green":
      return "border-green-200";
    case "yellow":
      return "border-yellow-200";
    case "purple":
      return "border-purple-200";
    case "pink":
      return "border-pink-200";
    case "gray":
      return "border-gray-200";
      default:
      return "border-gray-200";
  }
}
  export const getBorderColor400 = (color: string): string => {
    switch (color) {
      case "red":
      return  "border-red-400";
      case "blue":
        return "border-blue-400";
      case "green":
        return "border-green-400";
      case "yellow":
        return "border-yellow-400";
      case "purple":
        return "border-purple-400";
      case "pink":
        return "border-pink-400";
      case "gray":
        return "border-gray-400";
        default:
        return "border-gray-400";
    }
}

export const getBGColor50 = (color: string): string => {
 color = color.toLowerCase();
  switch (color) {
    case "red":
      return "bg-red-50";
    case "blue":
      return "bg-blue-50";
    case "green":
      return "bg-green-50";
    case "yellow":
      return "bg-yellow-50";
    case "purple":
      return "bg-purple-50";
    case "pink":
      return "bg-pink-50";
    case "gray":
      return "bg-gray-50";
    default:
      return "bg-gray-50";
  }
}