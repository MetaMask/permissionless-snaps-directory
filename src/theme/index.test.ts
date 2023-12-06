import { describe, it, expect } from '@jest/globals';

import { themeConfig } from '.';

describe('theme', () => {
  it('matches the snapshot', () => {
    expect(themeConfig).toMatchInlineSnapshot(`
      {
        "colors": {
          "error": {
            "default": "#D34C46",
            "muted": "rgba(215, 56, 71, 0.1)",
          },
          "gray": {
            "40": "#F2F4F6",
          },
          "success": {
            "default": "#579F6E",
            "muted": "rgba(40, 167, 69, 0.1)",
          },
          "text": {
            "alternative": "#535A61",
            "error": "#D34C46",
            "success": "#579F6E",
            "white": "#FFFFFF",
          },
        },
        "components": {
          "Button": {
            "baseStyle": {
              "_hover": {
                "opacity": "0.75",
              },
            },
            "variants": {
              "outline": {
                "background": "transparent",
                "border": "1.5px solid",
                "borderColor": "info.default",
                "borderRadius": "30px",
                "color": "info.default",
                "fontSize": "md",
                "fontWeight": "500",
                "height": "48px",
                "lineHeight": "157%",
                "padding": "4",
              },
              "primary": {
                "_hover": {
                  "_disabled": {
                    "background": "info.default",
                  },
                },
                "background": "info.default",
                "borderColor": "info.default",
                "borderRadius": "30px",
                "color": "white",
                "fontSize": "md",
                "fontWeight": "500",
                "height": "48px",
                "lineHeight": "157%",
                "padding": "4",
              },
              "shadow": {
                "_hover": {
                  "opacity": "0.75",
                },
                "background": "background.header",
                "boxShadow": "md",
              },
              "small": Object {
                "_groupHover": Object {
                  "background": "info.default",
                  "color": "white",
                },
                "background": "background.default",
                "borderColor": "info.default",
                "borderRadius": "36px",
                "color": "console",
                "fontSize": "sm",
                "fontWeight": "500",
                "height": "26px",
                "textTransform": "uppercase",
                "transitionDuration": "normal",
              },
              "solid": Object {
                "_active": Object {
                  "bg": "#0376C9",
                },
                "_hover": {
                  "bg": "#0376C9",
                },
                "bg": "#24272A",
                "textColor": "white",
              },
            },
          },
          "Container": {
            "baseStyle": {
              "paddingX": 4,
              "paddingY": 4,
            },
            "sizes": {
              "fullWidth": {
                "maxWidth": "100%",
              },
            },
          },
          "Divider": {
            "baseStyle": {
              "opacity": 1,
            },
          },
          "Link": {
            "baseStyle": {
              "color": "info.default",
            },
            "variants": {
              "box": {
                "backgroundColor": "background.alternative",
                "border": "1px solid",
                "borderColor": "border.default",
                "borderRadius": "lg",
                "display": "block",
                "paddingX": "4",
                "paddingY": "3",
                "width": "100%",
              },
              "landing": Object {
                "color": "info.default",
                "fontWeight": "500",
              },
              "navigation-active": Object {
                "background": "background.alternative",
                "borderRadius": "lg",
                "opacity": "1",
              },
              "navigation-default": {
                "borderRadius": "lg",
                "opacity": "0.6",
              },
            },
          },
          "Menu": {
            "baseStyle": {
              "groupTitle": {
                "color": "text.muted",
                "fontSize": "sm",
                "fontWeight": "500",
                "marginBottom": "1",
                "textTransform": "uppercase",
              },
              "item": {
                "_hover": {
                  "background": "background.alternative",
                },
                "background": "none",
                "padding": "2",
              },
              "list": {
                "background": "background.menu",
                "border": "none",
                "borderRadius": "lg",
                "boxShadow": "lg",
                "padding": "1",
              },
            },
            "parts": [
              "button",
              "list",
              "item",
              "groupTitle",
              "icon",
              "command",
              "divider",
            ],
          },
          "Modal": {
            "baseStyle": {
              "dialog": {
                "bg": "chakra-body-bg",
              },
            },
            "parts": [
              "overlay",
              "dialogContainer",
              "dialog",
              "header",
              "closeButton",
              "body",
              "footer",
            ],
            "variants": {
              "minimal": {
                "body": {
                  "padding": "0",
                },
                "dialog": {
                  "background": "chakra-body-bg",
                  "borderRadius": "3xl",
                  "padding": "6",
                },
              },
            },
          },
          "Skeleton": {
            "baseStyle": {
              "--skeleton-end-color": "colors.border",
              "--skeleton-start-color": "colors.background.alternative",
              "borderRadius": "lg",
            },
          },
          "Tabs": {
            "parts": [
              "root",
              "tab",
              "tablist",
              "tabpanel",
              "tabpanels",
              "indicator",
            ],
            "variants": {
              "line": {
                "tab": {
                  "& + &": {
                    "marginLeft": "4",
                  },
                  "_selected": {
                    "borderBottom": "2px solid",
                    "borderColor": "border.active",
                    "color": "text.tab.selected",
                  },
                  "background": "none",
                  "color": "text.tab",
                  "fontSize": "xs",
                  "fontWeight": "600",
                  "marginY": "3",
                  "outline": "none",
                  "paddingBottom": "0.5",
                  "paddingTop": "0",
                  "paddingX": "0",
                  "textTransform": "uppercase",
                },
                "tablist": {
                  "background": "background.alternative",
                  "borderBottom": "1px solid",
                  "borderColor": "border.default",
                  "paddingX": "4",
                },
              },
            },
          },
          "Tag": {
            "baseStyle": {
              "container": {
                "background": "info.muted",
                "borderRadius": "full",
                "color": "info.default",
                "fontSize": "sm",
                "fontWeight": "500",
                "paddingX": "2",
                "textTransform": "uppercase",
              },
            },
            "parts": [
              "container",
              "label",
              "closeButton",
            ],
            "variants": {
              "category": {
                "container": {
                  "background": "tag.category",
                  "lineHeight": "1.5",
                  "paddingX": "3",
                  "paddingY": "2",
                  "textTransform": "none",
                },
              },
              "code": {
                "container": {
                  "background": "info.muted",
                  "borderRadius": "0px",
                  "color": "info.default",
                  "fontFamily": "code",
                  "fontWeight": "normal",
                },
              },
              "muted": {
                "container": {
                  "backgroundColor": "tag.muted",
                  "color": "gray.muted",
                },
              },
            },
          },
          "Text": {
            "baseStyle": {
              "color": {
                "_dark": "white",
                "default": "black",
              },
            },
            "variants": {
              "muted": {
                "color": "text.muted",
              },
            },
          },
        },
        "config": {
          "initialColorMode": "system",
          "useSystemColorMode": true,
        },
        "fonts": {
          "body": ""Euclid Circular B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"",
          "code": "SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace",
          "heading": ""Euclid Circular B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"",
        },
        "semanticTokens": {
          "borders": {
            "muted": {
              "_dark": "1px solid #3B4046",
              "default": "1px solid #D6D9DC",
            },
          },
          "colors": {
            "background": {
              "alternative": {
                "_dark": "#1D1F22",
                "default": "#F5F5F5",
              },
              "body": {
                "_dark": "#141618",
                "default": "#F8F8F8",
              },
              "card": {
                "_dark": "#1D1F23",
                "default": "#FFFFFF",
              },
              "default": Object {
                "_dark": "#24272A",
                "default": "#FFFFFF",
              },
              "header": Object {
                "_dark": "rgba(29, 31, 35, 0.5)",
                "default": "rgba(255, 255, 255, 0.75)",
              },
              "hover": {
                "_dark": "#33373E",
                "default": "#EEEEEE",
              },
              "menu": {
                "_dark": "#282B2E",
                "default": "#FFFFFF",
              },
            },
            "border": {
              "active": {
                "_dark": "rgba(255, 255, 255, 0.06)",
                "default": "#24272A",
              },
              "default": {
                "_dark": "#3B4046",
                "default": "#D6D9DC",
              },
            },
            "gray": {
              "light": {
                "_dark": "#1A1C1F",
                "default": "#F1F1F1",
              },
              "muted": {
                "_dark": "#D6D9DC",
                "default": "#878787",
              },
            },
            "icon": {
              "alternative": {
                "_dark": "#141618",
                "default": "#F2F4F6",
              },
              "muted": {
                "default": "#6A737D",
              },
            },
            "info": {
              "default": {
                "_dark": "#1098FC",
                "default": "#0376C9",
              },
              "muted": {
                "_dark": "#141618",
                "default": "rgba(3, 118, 201, 0.1)",
              },
            },
            "tag": {
              "category": {
                "_dark": "rgba(16, 152, 252, 0.15)",
                "default": "info.muted",
              },
              "muted": {
                "_dark": "#141618",
                "default": "#F5F5F5",
              },
            },
            "text": {
              "_dark": "#9FA6AE",
              "console": {
                "_dark": "#D6D9DC",
                "default": "#535A61",
              },
              "default": "#24272A",
              "muted": {
                "_dark": "#D6D9DC",
                "default": "#BBC0C5",
              },
              "tab": {
                "_dark": "#FFFFFF",
                "default": "#535A61",
                "selected": {
                  "_dark": "#FFFFFF",
                  "default": "#24272A",
                },
              },
            },
          },
          "shadows": {
            "lg": "0px 2px 40px 0px #0000001A",
            "md": "0px 2px 16px 0px #0000001A",
          },
        },
        "styles": {
          "global": {
            "body": {
              "background": "background.body",
              "overflowY": "scroll",
            },
          },
        },
      }
    `);
  });
});
