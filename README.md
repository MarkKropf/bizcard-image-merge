# bizcard-image-merge

I used this command in bash to clip the first two lines of all the svg files. This was needed since pdfkit crashes hard on the first xml lines of the file.

```bash
ls *.svg | xargs sed -i '' '1,2d'
```

later I learned that pdflib also does not like html comments in svg's

```bash
ls *.svg | xargs sed -i '' '2d'
```
