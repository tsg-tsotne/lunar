# LunarSync

ქართული სადემონსტრაციო ვებსაიტი მთვარის ბაზების ენერგიის მართვის სასწავლო პროტოტიპისთვის.

## საიტი

https://lunar-sync-mission-2026.kindigloo1.chatgpt.site (Sites-ზე მფლობელისთვის პირადი წვდომა)

## შესაძლებლობები

- პროექტის მისია და კომპონენტების ინტერაქტიული მიმოხილვა
- მზის ტრეკერის, სინათლისა და მტვრის სიმულატორი
- ორი ბაზის განათების დემო მართვა
- აპარატურის ჩამონათვალი, განვითარების გეგმა და კითხვები
- ჩამოსატვირთი პროექტის აღწერა და მობილურზე მორგებული დიზაინი

## გაშვება

გახსენით `index.html` ბრაუზერში. Build ან dependency installation საჭირო არ არის. სურვილისამებრ გაუშვით ნებისმიერი static HTTP server ამ საქაღალდეში.

## ფაილები

- `index.html` — საიტის შინაარსი და SVG ილუსტრაცია
- `style.css` — ადაპტური დიზაინი
- `app.js` — კომპონენტები და სიმულატორი
- `project-brief.txt` — პროექტის აღწერა

## დემოს საზღვრები

სიმულატორი არ უკავშირდება რეალურ მოწყობილობას. პროცენტული გამომუშავება ილუსტრაციულია: სინათლე × (1 − მტვერი / 100) × cos(კუთხეთა სხვაობა). არ მოდელირდება ბატარეა, მოხმარება ან ენერგიის რეალური განაწილება. ფიზიკური პროტოტიპის Bluetooth მართვა ცალკე მობილური აპით ხდება.

Google Fonts-დან იტვირთება Noto Sans Georgian; ქსელის გარეშე გამოიყენება სისტემური შრიფტი.

## Languages / ენები

The header language switch supports Georgian and English. The choice is saved locally in the browser, and changing language preserves simulator settings and the selected component.

- Georgian: https://tsg-tsotne.github.io/lunar/?lang=ka
- English: https://tsg-tsotne.github.io/lunar/?lang=en

`i18n.js` contains the translation catalog and language selection logic. `language.css` styles the switch. The project brief downloads in the selected language (`project-brief.txt` or `project-brief-en.txt`). New dynamic UI strings should use `window.LunarI18n.t()` and refresh on `lunar-language-change`.
