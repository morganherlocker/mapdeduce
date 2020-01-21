mapdeduce
---

`mapdeduce` is a simple geospatial algorithm debugger.

## use

`mapdeduce` is not installed like a typical application. To use it, copy the provided `index.html` file, set your access token, then find and replace the data you would like to render. Save the rendered html file to disk, then view in a browser. See the included `demo.js` for an example, visualizing delaunay triangulation in node.js. A similar workflow should be possible in any language with filesystem access and a JSON writer.

## config

The following strings must be replaced for the demo to function:

- "{{token}}""
  - a Mapbox access token
- "{{actions}}"
  - an array of `mapdeduce` actions

## actions

- fit
  - description:
    - fit map to a bounding box
  - options:
    - `bbox`
      - GeoJSON bounding box - [minX, minY, maxX, maxY]
- draw
  - description:
    - draw a feature with a set of style options
  - options:
    - `geometry`
    - `style`
      - `color`
      - `opacity`
      - `width` (for Point and LineString geometries)
    - `fade`
      - fade duration in milliseconds
- clear
  - description:
    - clear all features
