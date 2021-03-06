import {h, Component} from "preact";

class Release extends Component {
  constructor(props) {
    super(props);

    this.setState({
      activeRow: -1,
    });
  }

  render({ infoHash }) {
    let release = this.context.backend.releases[infoHash];
    window._release = release;
    return (
      <div>
        <h2>{release.meta.title}</h2>
        <table class="table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artists</th>
            </tr>
          </thead>
          <tbody>
            {release.tracks.map((track, i) => (
              <tr key={i}
                  class={(this.state.activeRow == i) ? "active" : ""}
                  onclick={() => this.setState({
                    activeRow: i,
                  })}
                  ondblclick={() => {
                    // this should start playing automatically
                    this.context.backend.replacePlaylist(release.tracks, i);
                  }}>
                <td>{track.title}</td>
                <td>{track.artists.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style="opacity: .5;">Double-click any song to start playing!</p>
      </div>
    );
  }
}

export default Release;
