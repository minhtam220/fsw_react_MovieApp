## User Stories

- Users can see many movies layout on the website

- Users can see paginate through all movies from the database

- Users can see the detail of one single movie in a separate page, then select a movie ##from the list

- Users can see filter UI and can filter movies by genres -> done

- Users can see search UI and can search movies in the database by keyword

- Users can see the website is responsive for the minimum of Desktop, iPhone, and Tablet

- Users can see routes that allow user to revisit the same display when using such routes

- 🚀 Users can pick a favorite movie and save it.

There is an endpoint to make this happen; it is quite challenging, however. So we also allow using localStorage as a solution. But keep in mind that the correct way to make features like this is using a dedicated endpoint from the API to interact with the server and update the data

# milestones:

## login page:

-- design 5 square boxes -> done
-- two types: locked and no locked -> done
-- click on no locked and go to home page -> done
-- click on locked, enter the 4 digit passcode and go to home page -> done

## home page:

- design the navigation:
  -- logo/home/TV shows/Movies -> done
  -- search
  -- account
- design the hero session.
  -- auto play video -> done
- design the row:
  -- hover card
  -- click and go to movie page.
  -- click and save it to favorite.
  -- next and back
- design the top 10
  -- big rank

## detail movie page:

### Users can see information about the movie (authors, description, title, genres …)

- design the movie page
- design the info

### version 30/04/2023

code - làm trang home/tv/movie chung một trang -> done
improve - bỏ phần tv
code - làm chức năng random select movie cho hero section -> done
bug - hero video title và content không khớp nhau + bị chậm
design - chỉnh giao diện cho hero section ngay với movie -> done
bug - phần typo của hero section bị đẩy xuống dưới
design - chỉnh search cho ra màu trắng phần text -> done
bug - phần rìa border bị lem ra
code - làm trang search page: submit form thì ra page, không có hero section
bug - login ko có passcode okie, login bằng passcode bị fail
code - chỉnh search để khi bấm enter thì ra page search
