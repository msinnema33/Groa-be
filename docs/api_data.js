define({ "api": [
  {
    "type": "post",
    "url": "/users/:user_id/add-movie-rating",
    "title": "",
    "name": "Rate_a_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p><strong>Required</strong> | Title of the movie you want to rate.</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "year",
            "description": "<p><strong>Required</strong> | The year the movie was made.</p>"
          },
          {
            "group": "Parameter",
            "type": "float",
            "optional": false,
            "field": "rating",
            "description": "<p><strong>Required</strong> | The rating, can be 0 - 5 and accepts 3.5</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  message: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingBodyReqs",
            "description": "<p>The <code>req.body.param</code> was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  message: \"Please send a movie name with this request.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./uploading/groa-user-router.js",
    "groupTitle": "Movies"
  }
] });
