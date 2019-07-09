import * as React from "react";

export class List extends React.Component {
  items = [{name:'ssdsd', price: '$2000'}];
  constructor(props:any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.saleshandy.com/me/feed?per_page=25&page=3&action_group=ALL&action=ALL&user=ALL",{
      method: "GET",
      headers: {
        "content-type":"application/json;charset=UTF-8",
        "Accept": "application/json",
        "X-Authorization-Token":"VyvRLOh3i9VpQjny",
        "X-SH-Source":"WEB_APP"
      }})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.items = result.rows;
          this.setState({
            isLoaded: true,
            items: result.rows
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
     <div>
        {this.items.map((item:any) => (
          <div className="item">
            {JSON.stringify(item, null, 2)}
          </div>
        ))}
     </div>
    );
  }
}


export default List;